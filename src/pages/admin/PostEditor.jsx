import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, ImagePlus, ShieldAlert, Search, Tag, Globe, FileText } from 'lucide-react';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';

const CATEGORIES = ['Accounting', 'Payroll', 'Taxes', 'Bookkeeping', 'Financial Planning', 'Outreach'];

export default function PostEditor() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(null);
  const path = window.location.pathname;
  const isEdit = path.includes('/edit/');
  const postId = isEdit ? path.split('/edit/')[1] : null;

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', category: 'Accounting',
    status: 'draft', author_name: '', featured_image: '', read_time: 5,
    meta_description: '', meta_title: '', tags: ''
  });
  const [uploading, setUploading] = useState(false);
  const [adminConfirmed, setAdminConfirmed] = useState(false);

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
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'Accounting',
          status: post.status || 'draft',
          author_name: post.author_name || '',
          featured_image: post.featured_image || '',
          read_time: post.read_time || 5,
          meta_description: post.meta_description || '',
          meta_title: post.meta_title || '',
          tags: post.tags || '',
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
    saveMutation.mutate(form);
  };

  if (isAdmin === null) return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="text-slate-500 text-sm">Checking permissions...</div>
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <ShieldAlert className="w-14 h-14 mx-auto mb-4 text-red-400" />
          <h2 className="font-heading text-2xl font-bold mb-2 text-slate-800">Access Restricted</h2>
          <p className="text-slate-500 text-sm mb-6">Only admin users can create or edit blog posts.</p>
          <Link to="/" className="text-sm font-semibold hover:underline" style={{ color: '#b8a000' }}>← Go to Homepage</Link>
        </div>
      </div>
    );
  }

  if (!adminConfirmed) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-10 bg-white rounded-2xl shadow-md border border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FFD300' }}>
            <ShieldAlert className="w-7 h-7 text-slate-900" />
          </div>
          <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Admin Confirmation Required</h2>
          <p className="text-slate-500 text-sm mb-6">Only admins can publish blog posts. Regular users can only read articles. Please confirm before proceeding.</p>
          <label className="flex items-start gap-3 text-left cursor-pointer mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <input
              type="checkbox"
              checked={adminConfirmed}
              onChange={e => setAdminConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-yellow-500 flex-shrink-0"
            />
            <span className="text-sm text-slate-700 font-medium">I confirm I am an admin and I have the authority to create or edit blog posts. Users can only read, not post.</span>
          </label>
          <Link to="/" className="text-sm text-slate-400 hover:underline">← Go back to Homepage</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Posts
          </Link>
          <div className="flex items-center gap-3">
            <Select value={form.status} onValueChange={v => handleChange('status', v)}>
              <SelectTrigger className="w-32 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleSubmit} disabled={saveMutation.isPending} className="gap-2 h-9" style={{ backgroundColor: '#1a1a1a', color: '#FFD300' }}>
              {saveMutation.isPending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                : <><Save className="w-4 h-4" /> {isEdit ? 'Update' : 'Publish'}</>
              }
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-heading text-2xl font-bold text-slate-900 mb-8">{isEdit ? 'Edit Post' : 'New Post'}</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <Label htmlFor="title" className="font-semibold text-slate-700 block mb-2">Post Title *</Label>
              <Input id="title" value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Enter article title..." className="text-base font-medium" />
              <div className="mt-3">
                <Label htmlFor="slug" className="text-xs font-medium text-slate-500 block mb-1">URL Slug</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">/blog/</span>
                  <Input id="slug" value={form.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="article-url-slug" className="font-mono text-sm h-8" />
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <Label htmlFor="excerpt" className="font-semibold text-slate-700 block mb-2">Excerpt / Summary</Label>
              <Textarea id="excerpt" value={form.excerpt} onChange={e => handleChange('excerpt', e.target.value)} placeholder="Brief 1-2 sentence summary shown in article listings and as a pull quote..." rows={3} />
              <p className="text-xs text-slate-400 mt-1.5">Shown as intro quote on the article page</p>
            </div>

            {/* Article content */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <Label className="font-semibold text-slate-700 block mb-3">Article Content</Label>
              <div className="min-h-[380px] [&_.ql-editor]:min-h-[340px] [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg">
                <ReactQuill theme="snow" value={form.content} onChange={v => handleChange('content', v)} />
              </div>
            </div>

            {/* SEO Panel */}
            <div className="bg-white rounded-xl border border-yellow-100 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                <Globe className="w-4 h-4 text-yellow-600" />
                <h3 className="font-semibold text-slate-800 text-sm">SEO Settings</h3>
                <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: '#FFF9DB', color: '#b8a000' }}>Google Optimization</span>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="meta_title" className="font-semibold text-slate-700 block mb-1.5">
                    <FileText className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                    Meta Title <span className="text-slate-400 font-normal">(50-60 chars ideal)</span>
                  </Label>
                  <Input
                    id="meta_title"
                    value={form.meta_title}
                    onChange={e => handleChange('meta_title', e.target.value)}
                    placeholder="SEO page title shown in Google search results..."
                    maxLength={70}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-slate-400">Appears as the clickable headline in Google</p>
                    <span className={`text-xs font-medium ${form.meta_title.length > 60 ? 'text-red-500' : form.meta_title.length >= 50 ? 'text-green-600' : 'text-slate-400'}`}>
                      {form.meta_title.length}/60
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="meta_desc" className="font-semibold text-slate-700 block mb-1.5">
                    <Search className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                    Meta Description <span className="text-slate-400 font-normal">(150-160 chars ideal)</span>
                  </Label>
                  <Textarea
                    id="meta_desc"
                    value={form.meta_description}
                    onChange={e => handleChange('meta_description', e.target.value)}
                    placeholder="Compelling description that appears under the title in Google search results..."
                    rows={3}
                    maxLength={170}
                  />
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-slate-400">Shown under the title in Google results</p>
                    <span className={`text-xs font-medium ${form.meta_description.length > 160 ? 'text-red-500' : form.meta_description.length >= 150 ? 'text-green-600' : 'text-slate-400'}`}>
                      {form.meta_description.length}/160
                    </span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tags" className="font-semibold text-slate-700 block mb-1.5">
                    <Tag className="w-3.5 h-3.5 inline mr-1.5 text-slate-400" />
                    Tags <span className="text-slate-400 font-normal">(comma-separated)</span>
                  </Label>
                  <Input
                    id="tags"
                    value={form.tags}
                    onChange={e => handleChange('tags', e.target.value)}
                    placeholder="accounting software, small business taxes, IRS deductions..."
                  />
                  <p className="text-xs text-slate-400 mt-1">Help readers discover related articles</p>
                </div>

                {/* Google Preview */}
                {(form.meta_title || form.title) && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Google Preview</p>
                    <div className="font-medium text-blue-700 text-sm line-clamp-1">{form.meta_title || form.title}</div>
                    <div className="text-green-700 text-xs my-0.5">financeledgertips.com › blog › {form.slug || 'article-slug'}</div>
                    <div className="text-slate-600 text-xs line-clamp-2">{form.meta_description || form.excerpt || 'Add a meta description to preview how this will appear in Google search results.'}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Category & Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Post Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label className="font-semibold text-slate-700 block mb-1.5">Category</Label>
                  <Select value={form.category} onValueChange={v => handleChange('category', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="author" className="font-semibold text-slate-700 block mb-1.5">Author Name</Label>
                  <Input id="author" value={form.author_name} onChange={e => handleChange('author_name', e.target.value)} placeholder="Author" />
                </div>
                <div>
                  <Label htmlFor="readtime" className="font-semibold text-slate-700 block mb-1.5">Read Time (min)</Label>
                  <Input id="readtime" type="number" min={1} value={form.read_time} onChange={e => handleChange('read_time', parseInt(e.target.value) || 5)} />
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 text-sm mb-4">Featured Image</h3>
              {form.featured_image ? (
                <div className="space-y-3">
                  <img src={form.featured_image} alt="Preview" className="w-full aspect-video rounded-lg object-cover border border-gray-100" />
                  <label className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-gray-300 hover:border-yellow-400 text-sm text-slate-500 hover:text-yellow-600 transition-colors w-full">
                    <ImagePlus className="w-4 h-4" />
                    Replace Image
                    <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-lg border-2 border-dashed border-gray-200 hover:border-yellow-400 text-sm text-slate-400 hover:text-yellow-600 transition-colors">
                  <ImagePlus className="w-8 h-8" />
                  {uploading ? 'Uploading...' : 'Click to upload image'}
                  <span className="text-xs">PNG, JPG, WebP</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                </label>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}