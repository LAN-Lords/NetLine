import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkStats } from "@/app/components/networkDetails/network-stats";
import { AvailabilityStats } from "@/app/components/networkDetails/availability-stats";
import { ResponseTimeChart } from "@/app/components/networkDetails/response-time-chart";
import { Gauge } from "@/app/components/networkDetails/gauge";
import {
  Cpu,
  HardDrive,
  Network,
  PackageOpen,
  Timer,
  Wifi,
} from "lucide-react";
import cls from "./customclass.module.css";
import { singleRouterData } from "@/app/constants";
export default function RouterPage({ params }: { params: { id: string } }) {
  const routerData = Object.values(singleRouterData).find(
    (item) => item.id == params.id
  );

  console.log(routerData);
  return (
    <div
      className={`flex flex-col gap-6 p-8 max-h-screen overflow-auto ${cls.no_scrollbar}`}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interface</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {routerData?.interfaces.up}
                </div>
                <p className="text-xs text-muted-foreground">Up</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {routerData?.interfaces.down}
                </div>
                <p className="text-xs text-muted-foreground">Down</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buffer Miss</CardTitle>
            <PackageOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {routerData?.bufferMiss.small}
                </div>
                <p className="text-xs text-muted-foreground">Small</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {routerData?.bufferMiss.large}
                </div>
                <p className="text-xs text-muted-foreground">Large</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packet Lost</CardTitle>
            <Wifi className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {routerData?.packetLoss.received}
                </div>
                <p className="text-xs text-muted-foreground">Received</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-500">
                  {routerData?.packetLoss.transmitted}
                </div>
                <p className="text-xs text-muted-foreground">Transmitted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {routerData?.responseTime}
            </div>
            <p className="text-xs text-muted-foreground">Last checked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {routerData?.cpuUsage}
            </div>
            <p className="text-xs text-muted-foreground">Usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {routerData?.memoryUsage}
            </div>
            <p className="text-xs text-muted-foreground">Usage</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Network Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <NetworkStats data={routerData?.networkStats} />
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Response Time vs Packet Loss</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponseTimeChart data={routerData?.responseTimeChart} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Availability Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <AvailabilityStats data={routerData?.availabilityStats || []} />
          </CardContent>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Today&apos;s Availability</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <Gauge
              value={routerData?.gauge.value || 0}
              size={routerData?.gauge.size || "undefined"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
