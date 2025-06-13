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

interface FeedListItemToolBreastFeedingProps {
  item: FeedItemTypeMap;
}

// Mock breastfeeding data for the chart
const breastfeedingData = [
  {
    date: '12/5',
    feedingTime: 25,
    happiness: 8,
    soreness: 3,
    fullDate: '2024-12-05',
  },
  {
    date: '12/6',
    feedingTime: 30,
    happiness: 7,
    soreness: 4,
    fullDate: '2024-12-06',
  },
  {
    date: '12/7',
    feedingTime: 22,
    happiness: 9,
    soreness: 2,
    fullDate: '2024-12-07',
  },
  {
    date: '12/8',
    feedingTime: 28,
    happiness: 6,
    soreness: 5,
    fullDate: '2024-12-08',
  },
  {
    date: '12/9',
    feedingTime: 35,
    happiness: 8,
    soreness: 3,
    fullDate: '2024-12-09',
  },
  {
    date: '12/10',
    feedingTime: 20,
    happiness: 9,
    soreness: 2,
    fullDate: '2024-12-10',
  },
  {
    date: '12/11',
    feedingTime: 32,
    happiness: 7,
    soreness: 4,
    fullDate: '2024-12-11',
  },
  {
    date: '12/12',
    feedingTime: 26,
    happiness: 8,
    soreness: 3,
    fullDate: '2024-12-12',
  },
];

export const FeedListItemToolBreastFeeding: React.FC<FeedListItemToolBreastFeedingProps> = ({
  item,
}) => {
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`Date: ${data.fullDate}`}</p>
          <p className="text-pink-600">
            <Clock className="w-4 h-4 inline mr-1" />
            {`Feeding Time: ${data.feedingTime} minutes`}
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

  const breastfeedingHeader = (
    <div>
      <FeedItemHeader item={item} />

      {/* Breastfeeding Header with Icon */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 mt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <Baby className="w-4 h-4 text-white" />
            </div>
            <span className="text-pink-700 font-semibold text-sm">BREASTFEEDING JOURNEY</span>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeding Progress Tracker</h3>
          <p className="text-sm text-gray-600">
            Track feeding duration, comfort levels, and mood over time
          </p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={breastfeedingData}
              margin={{
                top: 20,
                right: 30,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
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
                label={{ value: 'Feeding Time (min)', angle: -90, position: 'insideLeft' }}
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
                dataKey="feedingTime"
                fill="#ec4899"
                name="Feeding Time (min)"
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

      {/* Summary Stats */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Weekly Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">27 min</div>
            <div className="text-gray-600">Avg. Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">7.8</div>
            <div className="text-gray-600">Avg. Happiness</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">3.3</div>
            <div className="text-gray-600">Avg. Soreness</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">8</div>
            <div className="text-gray-600">Sessions</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};
