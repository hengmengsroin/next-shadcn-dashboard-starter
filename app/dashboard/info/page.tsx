'use client';
import { FiUsers } from 'react-icons/fi';
import { api } from '@/trpc/react';
import { RiProductHuntLine } from 'react-icons/ri';
import { BsCapsulePill, BsCart3, BsShop } from 'react-icons/bs';
import React, { type ReactNode, useState } from 'react';
import OrgSelection from '@/components/OrgSelection';
import { GoChecklist } from 'react-icons/go';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { RxActivityLog } from 'react-icons/rx';
import { MdOutlineGeneratingTokens } from 'react-icons/md';
import Link from 'next/link';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Loading from '../loading';
import ErrorRefresh from '@/components/Error';
import Counter from '@/components/animata/text/counter';
import { Select } from '@/components/ui/select';

const DashboardPage = () => {
  return (
    <div className="overflow flex h-full w-full flex-col gap-4 p-2">
      <Statistic />
      <RevenueChart />
      <SalesChart />
      <LogsChart />
      <ProductChart />
    </div>
  );
};

const RevenueChart = () => {
  const chartConfig = {
    cost: {
      label: 'Cost',
      color: '#f87171'
    },
    sale: {
      label: 'Sale',
      color: '#60a5fa'
    },
    revenue: {
      label: 'Revenue',
      color: '#34d399'
    }
  } satisfies ChartConfig;
  const [org, setOrg] = useState<string>('');
  const [duration, setDuration] = useState<string>('30');
  const query = api.orders.getSaleChart.useQuery({
    organization: org,
    duration
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Sale Bar Chart</CardTitle>
          <CardDescription></CardDescription>
        </div>
        <div className="flex flex-row gap-4">
          <Select
            defaultValue={duration}
            onValueChange={(event) => {
              setDuration(event);
            }}
          >
            <option value="30">30 Days</option>
            <option value="90">3 Months</option>
            <option value="180">6 Months</option>
            <option value="365">1 Year</option>
          </Select>
          <OrgSelection
            value={org}
            onChange={(org) => {
              setOrg(org);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {query.isFetching && <Loading />}
        {query.error && (
          <ErrorRefresh
            error={query.error.message || 'An error has occurred'}
            onRefreshClick={() => {
              query.refetch();
            }}
          />
        )}
        {query.data && query.data?.length === 0 && <div>No data</div>}
        {query.data && query.data?.length > 0 && (
          <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
            <BarChart accessibilityLayer data={query.data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />
              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="sale" fill="var(--color-sale)" radius={4} />
              <Bar dataKey="cost" fill="var(--color-cost)" radius={4} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

const SalesChart = () => {
  const chartConfig = {
    sale: {
      label: 'Sale',
      color: '#60a5fa'
    },
    cost: {
      label: 'Cost',
      color: '#f87171'
    },
    revenue: {
      label: 'Revenue',
      color: '#34d399'
    }
  } satisfies ChartConfig;
  const [org, setOrg] = useState<string>('');
  const [duration, setDuration] = useState<string>('30');
  const query = api.orders.getSaleChart.useQuery({
    organization: org,
    duration
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Sale line chart</CardTitle>
          <CardDescription></CardDescription>
        </div>
        <div className="flex flex-row gap-4">
          <Select
            defaultValue={duration}
            onValueChange={(event) => {
              setDuration(event);
            }}
          >
            <option value="30">30 Days</option>
            <option value="90">3 Months</option>
            <option value="180">6 Months</option>
            <option value="365">1 Year</option>
          </Select>
          <OrgSelection
            value={org}
            onChange={(org) => {
              setOrg(org);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {query.isFetching && <Loading />}
        {query.error && (
          <ErrorRefresh
            error={query.error.message || 'An error has occurred'}
            onRefreshClick={() => {
              query.refetch();
            }}
          />
        )}
        {query.data && query.data.length === 0 && <div>No data</div>}
        {query.data && query.data.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={query.data}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-revenue)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-cost)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-cost)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillSale" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-sale)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-sale)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />

              <YAxis
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      });
                    }}
                    indicator="dot"
                  />
                }
              />

              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                stackId="a"
              />
              <Area
                dataKey="cost"
                type="natural"
                fill="url(#fillCost)"
                stroke="var(--color-cost)"
                stackId="a"
              />
              <Area
                dataKey="sale"
                type="natural"
                fill="url(#fillSale)"
                stroke="var(--color-sale)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

const ProductChart = () => {
  const chartConfig = {
    count: {
      label: 'Product',
      color: '#60a5fa'
    }
  } satisfies ChartConfig;
  const query = api.products.getChart.useQuery({});

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Total Product Chart</CardTitle>
          <CardDescription></CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {query.isFetching && <Loading />}
        {query.error && (
          <ErrorRefresh
            error={query.error.message || 'An error has occurred'}
            onRefreshClick={() => {
              query.refetch();
            }}
          />
        )}
        {query.data && query.data.length === 0 && <div>No data</div>}
        {query.data && query.data.length > 0 && (
          <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
            <BarChart accessibilityLayer data={query.data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

const LogsChart = () => {
  const chartConfig = {
    count: {
      label: 'Count',
      color: '#f87171'
    }
  } satisfies ChartConfig;
  const [org, setOrg] = useState<string>('');
  const [duration, setDuration] = useState<string>('30');
  const query = api.logs.getLogChart.useQuery({
    organization: org,
    duration
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Log line chart</CardTitle>
          <CardDescription></CardDescription>
        </div>
        <div className="flex flex-row gap-4">
          <Select
            defaultValue={duration}
            onValueChange={(event) => {
              setDuration(event);
            }}
          >
            <option value="30">30 Days</option>
            <option value="90">3 Months</option>
            <option value="180">6 Months</option>
            <option value="365">1 Year</option>
          </Select>
          <OrgSelection
            value={org}
            onChange={(org) => {
              setOrg(org);
            }}
          />
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {query.isFetching && <Loading />}
        {query.error && (
          <ErrorRefresh
            error={query.error.message || 'An error has occurred'}
            onRefreshClick={() => {
              query.refetch();
            }}
          />
        )}
        {query.data && query.data.length === 0 && <div>No data</div>}

        {query.data && query.data.length > 0 && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={query.data}>
              <defs>
                <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-count)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-count)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />

              <YAxis tickLine={false} tickMargin={10} axisLine={false} />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="count"
                type="natural"
                fill="url(#fillCount)"
                stroke="var(--color-count)"
                stackId="a"
              />

              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

const Statistic = () => {
  const query = api.general.getDashboardInfo.useQuery({});

  if (query.isFetching) {
    return <Loading />;
  }
  if (query.error) {
    return (
      <div className="h-[20%]">
        {query.error?.message || 'An error has occurred'}
      </div>
    );
  }
  if (!query.data) {
    return <div className="h-[20%]">No data</div>;
  }

  const data = query.data;
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      <InfoItem
        title="Total item"
        icon={<RiProductHuntLine />}
        value={data.totalItem}
        link="/products"
      />
      <InfoItem
        title="Total order"
        icon={<BsCart3 />}
        value={data.totalOrder}
        link="/orders"
      />
      <InfoItem
        title="Total organization"
        icon={<BsShop />}
        value={data.totalOrganization}
        link="/organizations"
      />
      <InfoItem
        title="Total user"
        icon={<FiUsers />}
        value={data.totalUser}
        link="/users"
      />
      <InfoItem
        title="Total product"
        icon={<BsCapsulePill />}
        value={data.totalProduct}
        link="/products"
      />
      <InfoItem
        title="Total list"
        icon={<GoChecklist />}
        value={data.totalList}
        link="/lists"
      />
      <InfoItem
        title="Total expense"
        icon={<FaFileInvoiceDollar />}
        value={data.totalExpense}
        link="/expenses"
      />
      <InfoItem
        title="Total log"
        icon={<RxActivityLog />}
        value={data.totalLog}
        link="/logs"
      />
      <InfoItem
        title="Total token"
        icon={<MdOutlineGeneratingTokens />}
        value={data.totalToken}
        link="#"
      />
    </div>
  );
};

const InfoItem = ({
  link,
  title,
  value,
  icon
}: {
  link: string;
  title: string;
  value: number;
  icon: ReactNode;
}) => {
  return (
    <Link href={link}>
      <div className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-gray-500 p-4">
        {icon}
        <Counter
          targetValue={value}
          format={(value: number) =>
            Intl.NumberFormat('en-US').format(+value.toFixed(0))
          }
        />
        <div className="font-bold">{title}</div>
      </div>
    </Link>
  );
};

export default DashboardPage;
