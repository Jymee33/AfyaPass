'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { mockFacilities } from '@/lib/mock-data';
import { Plus, Filter, Search, Building2, Activity, WifiHigh } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Link from 'next/link';

export default function FacilitiesDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [subCountyFilter, setSubCountyFilter] = useState('All');

  const totalRegistered = mockFacilities.length;
  const publicCount = mockFacilities.filter(f => f.facilityType === 'Public').length;
  const privateCount = mockFacilities.filter(f => f.facilityType !== 'Public').length;
  // Mock digital sync rate
  const syncRate = 86;

  const filtered = mockFacilities.filter(f => {
    const searchMatch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        f.facilityCode.toLowerCase().includes(searchTerm.toLowerCase());
    const levelMatch = levelFilter === 'All' || f.level.toString() === levelFilter;
    const typeMatch = typeFilter === 'All' || f.facilityType === typeFilter;
    const countyMatch = subCountyFilter === 'All' || f.subCounty === subCountyFilter;
    return searchMatch && levelMatch && typeMatch && countyMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Murang'a County Facility Registry</h1>
          <p className="text-sm text-slate-500 mt-1">Directory of all registered healthcare facilities in the county</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Register Facility
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Registered" 
          value={totalRegistered} 
          icon={<Building2 className="w-5 h-5 text-indigo-600" />}
        />
        <StatCard 
          title="Public Facilities" 
          value={publicCount} 
          icon={<Building2 className="w-5 h-5 text-info-600" />}
        />
        <StatCard 
          title="Private & Faith-Based" 
          value={privateCount} 
          icon={<Building2 className="w-5 h-5 text-purple-600" />}
        />
        <StatCard 
          title="Digital Sync Rate" 
          value={`${syncRate}%`} 
          icon={<WifiHigh className="w-5 h-5 text-success-600" />}
          trend="+4%"
          trendDirection="up"
        />
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search facility name or MFL code..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-40">
              <Select 
                value={levelFilter} 
                onChange={(e) => setLevelFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Levels' },
                  { value: '1', label: 'Level 1' },
                  { value: '2', label: 'Level 2' },
                  { value: '3', label: 'Level 3' },
                  { value: '4', label: 'Level 4' },
                  { value: '5', label: 'Level 5' }
                ]}
              />
            </div>
            <div className="w-full md:w-40">
              <Select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Types' },
                  { value: 'Public', label: 'Public' },
                  { value: 'Private', label: 'Private' },
                  { value: 'Faith-Based', label: 'Faith-Based' },
                  { value: 'Community', label: 'Community' }
                ]}
              />
            </div>
            <div className="w-full md:w-48">
              <Select 
                value={subCountyFilter} 
                onChange={(e) => setSubCountyFilter(e.target.value)}
                options={[
                  { value: 'All', label: 'All Sub-Counties' },
                  { value: 'Kiharu', label: 'Kiharu' },
                  { value: 'Kangema', label: 'Kangema' },
                  { value: 'Maragua', label: 'Maragua' },
                  { value: 'Kandara', label: 'Kandara' },
                  { value: 'Gatanga', label: 'Gatanga' }
                ]}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>MFL Code</TableHead>
                <TableHead>Facility Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Sub-County</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-mono text-xs">{facility.facilityCode}</TableCell>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Level {facility.level}</Badge>
                  </TableCell>
                  <TableCell>{facility.facilityType}</TableCell>
                  <TableCell>{facility.subCounty}</TableCell>
                  <TableCell>
                    <Badge variant={facility.isActive ? 'success' : 'default'} className="rounded-full">
                      {facility.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/facilities/${facility.id}`}>
                      <Button size="sm" variant="outline">
                        <Activity className="w-4 h-4 mr-1" /> View Dashboard
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No facilities found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
