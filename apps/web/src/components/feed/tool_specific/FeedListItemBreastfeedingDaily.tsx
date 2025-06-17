import { Baby, Clock, Frown, Smile } from 'lucide-react';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemBreastfeedingDailyProps {
  item: FeedItemTypeMap;
}

export const FeedListItemBreastfeedingDaily: React.FC<FeedListItemBreastfeedingDailyProps> = ({
  item,
}) => {
  // Use daily data with specific times (7am to 7am)
  const dailyData = item.breastfeedingDailyData || [];

  // Convert to chart format
  const chartData = dailyData.map((entry, index) => ({
    time: entry.time,
    duration: entry.duration,
    happiness: entry.happiness,
    soreness: entry.soreness,
    index: index + 1,
  }));

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`Time: ${data.time}`}</p>
          <p className="text-pink-600">
            <Clock className="w-4 h-4 inline mr-1" />
            {`Duration: ${data.duration} minutes`}
          </p>
          <p className="text-green-600">
            <Smile className="w-4 h-4 inline mr-1" />
            {`Happiness: ${data.happiness}/10`}
          </p>
          <p className="text-red-600">
            <Frown className="w-4 h-4 inline mr-1" />
            {`Soreness: ${data.soreness}/10`}
          </p>
        </div>
      );
    }
    return null;
  };

  const totalFeeds = dailyData.length;
  const totalDuration = dailyData.reduce((sum, feed) => sum + feed.duration, 0);
  const avgHappiness =
    dailyData.length > 0
      ? (dailyData.reduce((sum, feed) => sum + feed.happiness, 0) / dailyData.length).toFixed(1)
      : '0';
  const avgSoreness =
    dailyData.length > 0
      ? (dailyData.reduce((sum, feed) => sum + feed.soreness, 0) / dailyData.length).toFixed(1)
      : '0';

  const breastfeedingHeader = (
    <div>
      <FeedItemHeader item={item} />

      {/* Daily Header with Icon */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 mt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <Baby className="w-4 h-4 text-white" />
            </div>
            <span className="text-pink-700 font-semibold text-sm">DAILY FEEDING TRACKER</span>
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">7AM - 7AM</div>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Feeding Sessions</h3>
          <p className="text-sm text-gray-600">
            Track specific feeding times with duration and comfort levels (7AM to 7AM cycle)
          </p>
        </div>

        <div className="h-80 w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }}
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
                  dataKey="duration"
                  fill="#ec4899"
                  name="Duration (min)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.8}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="happiness"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Happiness Level"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="soreness"
                  stroke="#ef4444"
                  strokeWidth={3}
                  name="Soreness Level"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
              <div className="text-center">
                <Baby className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No feeding sessions recorded today</p>
                <p className="text-sm text-gray-400">Start tracking to see your daily progress!</p>
              </div>
            </div>
          )}
        </div>

        {/* Chart Legend Info */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-500 rounded"></div>
            <span className="text-gray-600">Feeding duration in minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Happiness level (1-10)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Soreness level (1-10)</span>
          </div>
        </div>
      </div>

      {/* Daily Summary Stats */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Today's Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalFeeds}</div>
            <div className="text-gray-600">Total Feeds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{totalDuration} min</div>
            <div className="text-gray-600">Total Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{avgHappiness}</div>
            <div className="text-gray-600">Avg. Happiness</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{avgSoreness}</div>
            <div className="text-gray-600">Avg. Soreness</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};
