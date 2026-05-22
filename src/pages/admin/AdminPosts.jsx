import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Pencil, Trash2, Eye, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function AdminPosts() {
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(null); // null = loading

  useEffect(() => {
    base44.auth.me()
      .then(user => setIsAdmin(user?.role === 'admin'))
      .catch(() => setIsAdmin(false));
  }, []);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: () => base44.entities.BlogPost.list('-created_date', 200),
    enabled: isAdmin === true,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.BlogPost.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      toast.success('Post deleted successfully');
    },
  });

  // Loading state
  if (isAdmin === null) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  // Access denied
  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-destructive opacity-60" />
        <h2 className="font-heading text-2xl font-bold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground text-sm mb-6">Only admin users can manage blog posts.</p>
        <Link to="/" className="text-sm font-semibold text-primary hover:underline">← Go to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold">Blog Management</h1>
          <p className="text-sm text-muted-foreground mt-1">{posts.length} total posts · Admin only</p>
        </div>
        <Link to="/admin/new">
          <Button className="rounded gap-2">
            <Plus className="w-4 h-4" /> New Post
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
          <p className="font-heading text-lg font-bold mb-2">No posts yet</p>
          <p className="text-sm mb-5">Create your first article to get started.</p>
          <Link to="/admin/new">
            <Button variant="outline" className="gap-2"><Plus className="w-4 h-4" /> Create Post</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Title</TableHead>
                <TableHead className="hidden sm:table-cell font-semibold">Category</TableHead>
                <TableHead className="hidden md:table-cell font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium max-w-[220px]">
                    <span className="truncate block">{post.title}</span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {post.category && (
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-800">{post.category}</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                    {post.created_date && format(new Date(post.created_date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {post.status === 'published' && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Link to={`/blog/${post.slug || post.id}`}><Eye className="w-3.5 h-3.5" /></Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Link to={`/admin/edit/${post.id}`}><Pencil className="w-3.5 h-3.5" /></Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => { if (confirm('Delete this post permanently?')) deleteMutation.mutate(post.id); }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}