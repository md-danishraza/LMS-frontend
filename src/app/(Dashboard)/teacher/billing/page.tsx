'use client';
import Loader from '@/components/Loader';
import { useListTrasactionsQuery } from '@/state/apis/paymentApi'; // Adjust path as needed
import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';



type TransactionStatus = 'all' | 'SUCCESS' | 'PENDING' | 'FAILED';

function BillingPage() {
  // filters
  const [paymentType, setPaymentType] = useState('all');
  const [statusFilter, setStatusFilter] = useState<TransactionStatus>('all');


  const { user, isLoaded } = useUser();

  
  const { data: transactions, isLoading } = useListTrasactionsQuery(
    { userId: user?.id || '' },
    { skip: !isLoaded || !user }
  );

  // console.log(transactions)
  const filteredData =
    transactions?.filter((transaction) => {
      // Check payment type
      const matchesTypes =
        paymentType === 'all' || transaction.paymentProvider === paymentType;
      // Check status
      const matchesStatus =
        statusFilter === 'all' || transaction.status === statusFilter;
      
      // Return true only if both match
      return matchesTypes && matchesStatus;
    }) || [];

  if (!isLoaded) {
    return <Loader />;
  }

  if (!user) {
    return (
      <h1 className="text-4xl text-center text-destructive">
        Please Sign in to Access this page.
      </h1>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">
        Billing History
      </h1>

      {/* --- Filter Controls --- */}
      <Card className="mb-8 shadow-sm">
        <CardContent className="pt-6">
          {/* Use a responsive flex container for filters */}
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            
            {/* Filter 1: Payment Method */}
            <div className="w-full md:w-1/3">
              <Label htmlFor="payment-filter" className='mb-2'>Filter by Method</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger id="payment-filter">
                  <SelectValue placeholder="Filter by method..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cashfree">Cashfree</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* NEW Filter 2: Status */}
            <div className="w-full md:w-1/3">
              <Label htmlFor="status-filter" className='mb-2'>Filter by Status</Label>
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value as TransactionStatus)}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* --- Transactions Table --- */}
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
          <CardDescription>
            A complete history of your payments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading && filteredData.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      You have no transactions yet.
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  filteredData.map((tran) => (
                    <TableRow key={tran.transactionId}>
                      <TableCell className="font-mono text-xs">
                        {/* Show first part of Order ID */}
                        {/* {tran.transactionId.split('-')[0]}... */}
                        {tran.transactionId}
                      </TableCell>
                      <TableCell>
                        {new Date(tran.dateTime).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            tran.status === 'SUCCESS'
                              ? 'default'
                              : tran.status === 'FAILED'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {tran.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="capitalize">
                          {tran.paymentProvider}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {/* Assuming amount is in cents, format to currency */}
                        ₹{tran.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BillingPage;
