import { useState, useEffect } from 'react';
import { Mail, Calendar, Building } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  business: string;
  message: string;
  status: string;
  created_at: string;
}

export default function SubmissionsManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      loadSubmissions();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return <div className="text-center text-electric-blue">Loading submissions...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <span className="text-sm text-gray-400">{submissions.length} total</span>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No submissions yet
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 bg-black/50 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{submission.name}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {submission.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {submission.business}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(submission.created_at)}
                    </span>
                  </div>
                </div>
                <select
                  value={submission.status}
                  onChange={(e) => updateStatus(submission.id, e.target.value)}
                  className="px-3 py-1 bg-dark-gray border border-gray-700 rounded text-sm text-white focus:border-electric-blue focus:outline-none"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="responded">Responded</option>
                </select>
              </div>
              <div className="p-3 bg-gray-900/50 rounded border border-gray-800">
                <p className="text-sm text-gray-300 whitespace-pre-wrap">{submission.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
