
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, Globe, AlertTriangle } from 'lucide-react';

interface AccessLog {
  id: string;
  accessed_at: string;
  success: boolean;
  ip_address: string;
  country: string;
  city: string;
  error_type: string;
}

interface AccessStatsProps {
  paintingId: string;
}

const AccessStats = ({ paintingId }: AccessStatsProps) => {
  const [logs, setLogs] = useState<AccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAccess: 0,
    successfulAccess: 0,
    failedAccess: 0,
    uniqueIPs: 0,
  });

  useEffect(() => {
    fetchAccessLogs();
  }, [paintingId]);

  const fetchAccessLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('access_logs')
        .select('*')
        .eq('painting_id', paintingId)
        .order('accessed_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      setLogs(data || []);
      
      // Calculate stats
      const totalAccess = data?.length || 0;
      const successfulAccess = data?.filter(log => log.success).length || 0;
      const failedAccess = totalAccess - successfulAccess;
      const uniqueIPs = new Set(data?.map(log => log.ip_address).filter(Boolean)).size;

      setStats({
        totalAccess,
        successfulAccess,
        failedAccess,
        uniqueIPs,
      });
    } catch (error) {
      console.error('Error fetching access logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading statistics...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <div className="text-lg font-bold">{stats.totalAccess}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Globe className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Unique</span>
            </div>
            <div className="text-lg font-bold">{stats.uniqueIPs}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            <div className="text-lg font-bold text-green-600">{stats.successfulAccess}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Failed</span>
            </div>
            <div className="text-lg font-bold text-red-600">{stats.failedAccess}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Access Logs */}
      <div>
        <h4 className="font-medium mb-2">Recent Access</h4>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No access attempts yet
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {logs.slice(0, 10).map((log) => (
              <div key={log.id} className="flex items-center justify-between text-xs p-2 border rounded">
                <div className="flex items-center gap-2">
                  <Badge variant={log.success ? "default" : "destructive"} className="text-xs">
                    {log.success ? "✓" : "✗"}
                  </Badge>
                  <span className="text-muted-foreground">
                    {new Date(log.accessed_at).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {log.country && (
                    <span className="text-muted-foreground">{log.country}</span>
                  )}
                  {log.ip_address && (
                    <span className="font-mono text-xs bg-muted px-1 rounded">
                      {log.ip_address.slice(-8)}...
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessStats;
