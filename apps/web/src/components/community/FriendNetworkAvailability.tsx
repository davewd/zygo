interface Friend {
  id: string;
  name: string;
  age: number;
  parentName: string;
  availability: string;
  nextActivity?: string;
}

interface FriendNetworkAvailabilityProps {
  compact?: boolean;
  onCreatePlaydate?: (timeSlot?: { date: Date; hour?: number }) => void;
}

export const FriendNetworkAvailability = ({
  compact = false,
  onCreatePlaydate,
}: FriendNetworkAvailabilityProps) => {
  // Mock friends data for summer holidays
  const friends: Friend[] = [
    {
      id: '1',
      name: 'Sophie',
      age: 7,
      parentName: 'Sarah Johnson',
      availability: 'Available 3 days this week',
      nextActivity: 'Beach trip planned',
    },
    {
      id: '2',
      name: 'Oliver',
      age: 8,
      parentName: 'Mike Chen',
      availability: 'Available 4 days this week',
      nextActivity: 'Zoo visit planned',
    },
    {
      id: '3',
      name: 'Lily',
      age: 6,
      parentName: 'Emma Davis',
      availability: 'Available 2 days this week',
      nextActivity: 'Arts and crafts morning',
    },
    {
      id: '4',
      name: 'Alex',
      age: 7,
      parentName: 'James Wilson',
      availability: 'Available 3 days this week',
      nextActivity: 'Playground adventure',
    },
    {
      id: '5',
      name: 'Maya',
      age: 5,
      parentName: 'Lisa Rodriguez',
      availability: 'Available 2 days this week',
      nextActivity: 'Museum visit',
    },
    {
      id: '6',
      name: 'Ethan',
      age: 8,
      parentName: 'David Thompson',
      availability: 'Available 5 days this week',
      nextActivity: 'Sports day activities',
    },
  ];

  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-zygo-blue text-white rounded-full flex items-center justify-center text-xs font-medium">
                {friend.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{friend.name}</div>
                <div className="text-xs text-gray-500">{friend.parentName}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="text-gray-600">{friend.availability}</div>
              {friend.nextActivity && (
                <div className="text-zygo-red font-medium">{friend.nextActivity}</div>
              )}
            </div>

            <div className="flex space-x-1">
              <button className="flex-1 text-xs px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
                Message
              </button>
              <button
                className="flex-1 text-xs px-2 py-1 bg-zygo-red text-white rounded hover:bg-zygo-red/90"
                onClick={() => onCreatePlaydate?.({ date: new Date(), hour: 10 })}
              >
                Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Friend Network Availability</h3>
        <p className="text-gray-600 mb-6">
          See when your friends' children are available for summer holiday activities
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{friends.length}</div>
            <div className="text-sm text-gray-600">Connected Families</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-sm text-gray-600">Perfect Match Times</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">18</div>
            <div className="text-sm text-gray-600">Total Available Slots</div>
          </div>
        </div>

        <div className="space-y-4">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-zygo-blue text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {friend.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">
                      {friend.name} ({friend.age} years)
                    </div>
                    <div className="text-sm text-gray-600">{friend.parentName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-zygo-red">{friend.availability}</div>
                  {friend.nextActivity && (
                    <div className="text-xs text-gray-500">{friend.nextActivity}</div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 px-3 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 text-sm">
                  Send Message
                </button>
                <button
                  className="flex-1 px-3 py-2 bg-zygo-red text-white rounded hover:bg-zygo-red/90 text-sm"
                  onClick={() => onCreatePlaydate?.({ date: new Date(), hour: 10 })}
                >
                  Plan Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
