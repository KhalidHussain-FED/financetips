import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, ImagePlus, ShieldAlert, Search, Tag, Globe, FileText, Eye, AlertCircle, CheckCircle2, XCircle, BarChart3, Link2, Image, Hash, Layers } from 'lucide-react';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CATEGORIES = ['Accounting', 'Payroll', 'Taxes', 'Bookkeeping', 'Financial Planning', 'Outreach'];

const getSlugStatus = (slug) => {
  if (!slug) return { color: 'text-red-500', message: 'Required' };
  if (slug.length < 3) return { color: 'text-orange-500', message: 'Too short' };
  return { color: 'text-green-600', message: 'Good' };
};

const analyzeSEO = (form) => {
  const content = form.content || '';
  const plainText = content.replace(/<[^>]*>/g, '');
  const wordCount = plainText.split(/\s+/).filter(w => w.length > 0).length;
  const h1Count = (content.match(/<h1[^>]*>/g) || []).length;
  const h2Count = (content.match(/<h2[^>]*>/g) || []).length;
  const internalLinks = (content.match(/href="\/(?!\/)[^"]*"/g) || []).length;
  const images = (content.match(/<img[^>]*>/g) || []).length;
  const imagesWithAlt = (content.match(/<img[^>]*alt="[^"]+"[^>]*>/g) || []).length;
  const titleLength = (form.meta_title || form.title || '').length;
  const metaDescLength = (form.meta_description || '').length;

  return [
    { label: 'SEO Title', value: `${titleLength} chars`, ideal: '50-60', pass: titleLength >= 30 && titleLength <= 60 },
    { label: 'Meta Description', value: `${metaDescLength} chars`, ideal: '150-160', pass: metaDescLength >= 120 && metaDescLength <= 160 },
    { label: 'URL Slug', value: form.slug || 'Missing', ideal: '3-75 chars', pass: (form.slug || '').length >= 3 },
    { label: 'Content Length', value: `${wordCount} words`, ideal: '300+', pass: wordCount >= 300 },
    { label: 'H1 Tag', value: `${h1Count}`, ideal: '1', pass: h1Count === 1 },
    { label: 'H2 Tags', value: `${h2Count}`, ideal: '2+', pass: h2Count >= 2 },
    { label: 'Internal Links', value: `${internalLinks}`, ideal: '1+', pass: internalLinks >= 1 },
    { label: 'Featured Image', value: form.featured_image ? 'Set' : 'None', ideal: 'Required', pass: !!form.featured_image },
    { label: 'Images Alt Text', value: `${imagesWithAlt}/${images}`, ideal: 'All', pass: images === 0 || imagesWithAlt === images },
    { label: 'Category', value: form.category || 'None', ideal: 'Required', pass: !!form.category },
    { label: 'Tags', value: `${(form.tags || '').split(',').filter(t => t.trim()).length}`, ideal: '1+', pass: (form.tags || '').split(',').filter(t => t.trim()).length >= 1 },
  ];
};

export default function PostEditor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(null);
  const path = window.location.pathname;
  const isEdit = path.includes('/edit/');
  const postId = isEdit ? path.split('/edit/')[1] : null;

  const [form, setForm] = useState({
    title: '', slug: '', content: '', category: 'Accounting',
    status: 'draft', author_name: '', featured_image: '', read_time: 5,
    meta_description: '', meta_title: '', tags: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    base44.auth.me()
      .then(user => setIsAdmin(user?.role === 'admin'))
      .catch(() => setIsAdmin(false));
  }, []);

  const { data: existingPosts } = useQuery({
    queryKey: ['edit-post', postId],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 200),
    enabled: !!postId && isAdmin === true,
  });

  useEffect(() => {
    if (existingPosts && postId) {
      const post = existingPosts.find(p => p.id === postId);
      if (post) {
        setForm({
          title: post.title || '', slug: post.slug || '', content: post.content || '',
          category: post.category || 'Accounting', status: post.status || 'draft',
          author_name: post.author_name || '', featured_image: post.featured_image || '',
          read_time: post.read_time || 5, meta_description: post.meta_description || '',
          meta_title: post.meta_title || '', tags: post.tags || '',
        });
      }
    }
  }, [existingPosts, postId]);

  const saveMutation = useMutation({
    mutationFn: (data) => isEdit && postId
      ? base44.entities.BlogPost.update(postId, data)
      : base44.entities.BlogPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success(isEdit ? 'Post updated!' : 'Post created!');
      navigate('/admin');
    },
  });

  const handleChange = (field, value) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (field === 'title' && !isEdit) {
        next.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!next.meta_title) next.meta_title = value;
      }
      return next;
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm(prev => ({ ...prev, featured_image: file_url }));
    setUploading(false);
    toast.success('Image uploaded');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.slug.trim()) { toast.error('Slug is required'); return; }
    saveMutation.mutate(form);
  };

  const slugStatus = getSlugStatus(form.slug);
  const seoChecks = analyzeSEO(form);
  const seoScore = Math.round((seoChecks.filter(c => c.pass).length / seoChecks.length) * 100);

  if (isAdmin === null) return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <p className="text-slate-500">Checking permissions...</p>
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto text-center px-4">
          <ShieldAlert className="w-14 h-14 mx-auto mb-4 text-red-400" />
          <h2 className="font-heading text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-slate-500 text-sm mb-6">Only admins can create or edit posts.</p>
          <Link to="/" className="text-sm font-semibold text-yellow-600 hover:underline">← Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
            <ArrowLeft className="w-4 h-4" /> Back to Posts
          </Link>
          <div className="flex items-center gap-3">
            <Select value={form.status} onValueChange={v => handleChange('status', v)}>
              <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit} disabled={saveMutation.isPending} className="gap-2 h-9" style={{ backgroundColor: '#1a1a1a', color: '#FFD300' }}>
              {saveMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> {isEdit ? 'Update' : 'Publish'}</>}
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-8">{isEdit ? 'Edit Post' : 'New Post'}</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <Label htmlFor="title" className="font-semibold text-slate-700 block mb-2">Post Title *</Label>
              <Input id="title" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Enter article title..." className="text-base font-medium" />
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-xs text-slate-500">URL Slug</Label>
                  <span className={`text-xs font-medium ${slugStatus.color}`}>{slugStatus.message}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">/</span>
                  <Input value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="article-slug" className="font-mono text-sm h-8" />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <Label className="font-semibold text-slate-700 block mb-3">Article Content</Label>
              <div className="min-h-[400px] [&_.ql-editor]:min-h-[360px] [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg">
                <ReactQuill theme="snow" value={form.content} onChange={v => handleChange('content', v)} />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Globe className="w-4 h-4 text-yellow-600" />
                <h3 className="font-semibold text-slate-800 text-sm">SEO Settings</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold text-slate-700 block mb-1.5">Meta Title (50-60 chars)</Label>
                  <Input value={form.meta_title} onChange={e => handleChange('meta_title', e.target.value)} maxLength={70} />
                </div>
                <div>
                  <Label className="font-semibold text-slate-700 block mb-1.5">Meta Description (150-160 chars)</Label>
                  <Textarea value={form.meta_description} onChange={e => handleChange('meta_description', e.target.value)} rows={3} maxLength={170} />
                </div>
                <div>
                  <Label className="font-semibold text-slate-700 block mb-1.5">Tags (comma-separated)</Label>
                  <Input value={form.tags} onChange={e => handleChange('tags', e.target.value)} placeholder="taxes, IRS, small business..." />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            
            {/* Post Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Post Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold text-slate-700 block mb-1.5">Category</Label>
                  <Select value={form.category} onValueChange={v => handleChange('category', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label className="font-semibold text-slate-700 block mb-1.5">Author</Label>
                  <Input value={form.author_name} onChange={e => handleChange('author_name', e.target.value)} />
                </div>
                <div><Label className="font-semibold text-slate-700 block mb-1.5">Read Time (min)</Label>
                  <Input type="number" min={1} value={form.read_time} onChange={e => handleChange('read_time', parseInt(e.target.value) || 5)} />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Featured Image</h3>
              {form.featured_image ? (
                <div className="space-y-3">
                  <img src={form.featured_image} alt="Preview" className="w-full aspect-video rounded-lg object-cover" />
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gray-300 hover:border-yellow-400 text-sm">
                    <ImagePlus className="w-4 h-4" /> Replace
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 text-sm text-slate-400">
                  <ImagePlus className="w-8 h-8" />{uploading ? 'Uploading...' : 'Click to upload'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* ========== SEO CHECKLIST BELOW FEATURED IMAGE ========== */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-yellow-600" />
                    <h3 className="font-semibold text-slate-800 text-sm">SEO Checklist</h3>
                  </div>
                  <span className={`text-sm font-bold ${
                    seoScore >= 80 ? 'text-green-600' : seoScore >= 50 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {seoScore}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className={`h-full rounded-full ${
                    seoScore >= 80 ? 'bg-green-500' : seoScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} style={{ width: `${seoScore}%` }} />
                </div>
              </div>
              
              <div className="p-4 space-y-1.5">
                {seoChecks.map((check, i) => (
                  <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded text-xs">
                    {check.pass ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    )}
                    <span className={check.pass ? 'text-slate-700' : 'text-red-600'}>
                      <strong>{check.label}</strong>: {check.value}
                    </span>
                    <span className="text-slate-400 ml-auto text-[10px]">{check.ideal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}