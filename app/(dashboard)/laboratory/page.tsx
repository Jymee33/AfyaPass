'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { Select } from '@/components/ui/Select';
import { IcPlus, IcTestTube, IcClock, IcCheckCircle, IcAlert } from '@/components/icons';
import { mockLabOrders } from '@/lib/mock-data';

export default function LabOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Laboratory Orders</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track laboratory test orders</p>
        </div>
        <Button>
          <IcPlus className="w-4 h-4 mr-2" />
          Create Lab Order
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Orders"
          value="34"
          icon={<IcTestTube className="w-5 h-5 text-slate-400" />}
        />
        <StatCard
          title="In Progress"
          value="14"
          icon={<IcClock className="w-5 h-5 text-info-500" />}
        />
        <StatCard
          title="Completed Today"
          value="28"
          icon={<IcCheckCircle className="w-5 h-5 text-success-500" />}
        />
        <StatCard
          title="Urgent STAT"
          value="3"
          icon={<IcAlert className="w-5 h-5 text-warning-500" />}
        />
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput placeholder="Search test or patient..." className="w-full" />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Priorities' },
                { value: 'Routine', label: 'Routine' },
                { value: 'Urgent', label: 'Urgent' },
                { value: 'STAT', label: 'STAT' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
          <div className="w-full md:w-48">
            <Select 
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
              ]}
              value="all"
              onChange={() => {}}
            />
          </div>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Test Name & Code</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Priority</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Patient</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Ordering Provider</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Order Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm text-slate-500">Status</th>
                <th className="text-right py-3 px-4 font-medium text-sm text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* MOCK DATA — Replace with Supabase query when backend integration is implemented */}
              {mockLabOrders.map((order) => (
                <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
                      {order.id.substring(0,8)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-sm text-slate-900">{order.testName}</div>
                    <div className="text-xs text-slate-500">{order.testCode}</div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      order.priority === 'STAT' ? 'destructive' :
                      order.priority === 'Urgent' ? 'warning' : 'secondary'
                    }>
                      {order.priority}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900">
                    {order.patientId.substring(0,8)}...
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-900">Dr. {order.orderedBy.substring(0,6)}...</div>
                    <div className="text-xs text-slate-500">{order.facilityId}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">
                    {new Date(order.orderedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      order.status === 'Completed' ? 'success' :
                      order.status === 'In Progress' ? 'primary' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-right">
                    {order.status === 'Pending' || order.status === 'In Progress' ? (
                      <Button variant="ghost" size="sm" className="text-afya-600 hover:text-afya-700 hover:bg-afya-50">
                        Enter Results
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
