import { TrendingUp } from 'lucide-react';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemBreastfeedingWeeklyProps {
  item: FeedItemTypeMap;
}

export const FeedListItemBreastfeedingWeekly: React.FC<FeedListItemBreastfeedingWeeklyProps> = ({
  item,
}) => {
  // Use weekly summary data
  const weeklyData = item.breastfeedingWeeklySummary?.weeklyData || [];
  const weeklySummary = item.breastfeedingWeeklySummary || {
    totalWeeklyFeeds: 0,
    avgDailyFeeds: 0,
  };

  // Custom label component for count on top of bars
  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#6b7280"
        textAnchor="middle"
        fontSize="12"
        fontWeight="bold"
      >
        {value}
      </text>
    );
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`${label}`}</p>
          <p className="text-blue-600">
            <TrendingUp className="w-4 h-4 inline mr-1" />
            {`${data.feedCount} feeds`}
          </p>
          <p className="text-pink-600">{`Avg Duration: ${data.avgDuration} min`}</p>
          <p className="text-green-600">{`Avg Happiness: ${data.avgHappiness}/10`}</p>
          <p className="text-red-600">{`Avg Soreness: ${data.avgSoreness}/10`}</p>
        </div>
      );
    }
    return null;
  };

  const breastfeedingHeader = (
    <div>
      <FeedItemHeader item={item} />

      {/* Weekly Header with Icon */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-blue-700 font-semibold text-sm">WEEKLY FEEDING SUMMARY</span>
          </div>
        </div>

        {item.title && <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>}
        {item.post && <p className="text-gray-800 leading-relaxed">{item.post}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} customHeader={breastfeedingHeader} />

      {/* Chart Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Feeding Patterns</h3>
          <p className="text-sm text-gray-600">
            Average daily feeding duration with session counts (numbers shown above bars)
          </p>
        </div>

        <div className="h-80 w-full">
          {weeklyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={weeklyData}
                margin={{
                  top: 30,
                  right: 30,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  label={{ value: 'Avg Duration (min)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  label={{ value: 'Rating (1-10)', angle: 90, position: 'insideRight' }}
                  domain={[0, 10]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="avgDuration"
                  fill="#3b82f6"
                  name="Avg Duration (min)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                >
                  <LabelList dataKey="feedCount" content={<CustomLabel />} />
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgHappiness"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Avg Happiness"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgSoreness"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Avg Soreness"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No weekly data available yet</p>
                <p className="text-sm text-gray-400">Complete a week of tracking to see trends!</p>
              </div>
            </div>
          )}
        </div>

        {/* Chart Legend Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Average duration per day (numbers = feed count)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Average happiness level (1-10)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Average soreness level (1-10)</span>
          </div>
        </div>
      </div>

      {/* Weekly Summary Stats - RHS unchanged as requested */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">This Week's Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklySummary.totalWeeklyFeeds}</div>
            <div className="text-gray-600">Total Feeds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {weeklySummary.avgDailyFeeds.toFixed(1)}
            </div>
            <div className="text-gray-600">Avg Feeds/Day</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{weeklyData.length}</div>
            <div className="text-gray-600">Days Tracked</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};
