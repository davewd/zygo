import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@zygo/ui';
import { Baby, Edit, Pause, Play, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  profileImage?: string;
}

interface FeedingEntry {
  side: 'left' | 'right' | 'bottle';
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  childId: string;
  amount?: number; // in ml for bottle feeding
}

interface FeedingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  totalDuration: number; // in seconds
  entries: FeedingEntry[];
  notes?: string;
}

interface Timer {
  startTime: Date | null;
  elapsed: number; // in seconds
  isRunning: boolean;
}

// Mock children data
const mockChildren: Child[] = [
  {
    id: 'child_001',
    name: 'Emma Johnson',
    dateOfBirth: '2023-03-10',
    profileImage:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 'child_002',
    name: 'Oliver Chen',
    dateOfBirth: '2023-08-15',
    profileImage:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=150&h=150&fit=crop&crop=face',
  },
];

export default function BreastfeedingTimer() {
  const [children] = useState<Child[]>(mockChildren);
  const [previousSessions, setPreviousSessions] = useState<FeedingSession[]>([]);
  const [currentSession, setCurrentSession] = useState<FeedingSession | null>(null);
  const [leftTimer, setLeftTimer] = useState<Timer>({
    startTime: null,
    elapsed: 0,
    isRunning: false,
  });
  const [rightTimer, setRightTimer] = useState<Timer>({
    startTime: null,
    elapsed: 0,
    isRunning: false,
  });
  const [leftChildId, setLeftChildId] = useState<string>('');
  const [rightChildId, setRightChildId] = useState<string>('');
  const [bottleChildId, setBottleChildId] = useState<string>('');
  const [bottleAmount, setBottleAmount] = useState<string>('');
  const [editingSession, setEditingSession] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current');

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (leftTimer.isRunning && leftTimer.startTime) {
        setLeftTimer((prev) => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000),
        }));
      }
      if (rightTimer.isRunning && rightTimer.startTime) {
        setRightTimer((prev) => ({
          ...prev,
          elapsed: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000),
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [leftTimer.isRunning, leftTimer.startTime, rightTimer.isRunning, rightTimer.startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (side: 'left' | 'right') => {
    const now = new Date();
    if (side === 'left') {
      setLeftTimer({ startTime: now, elapsed: 0, isRunning: true });
    } else {
      setRightTimer({ startTime: now, elapsed: 0, isRunning: true });
    }
  };

  const pauseTimer = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftTimer((prev) => ({ ...prev, isRunning: false }));
    } else {
      setRightTimer((prev) => ({ ...prev, isRunning: false }));
    }
  };

  const stopTimer = (side: 'left' | 'right') => {
    const timer = side === 'left' ? leftTimer : rightTimer;
    const childId = side === 'left' ? leftChildId : rightChildId;

    if (timer.startTime && childId) {
      const entry: FeedingEntry = {
        side,
        startTime: timer.startTime,
        endTime: new Date(),
        duration: timer.elapsed,
        childId,
      };

      // Add to current session or create new one
      if (currentSession) {
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                entries: [...prev.entries, entry],
                endTime: new Date(),
                totalDuration: prev.totalDuration + timer.elapsed,
              }
            : null
        );
      } else {
        const newSession: FeedingSession = {
          id: Date.now().toString(),
          startTime: timer.startTime,
          endTime: new Date(),
          totalDuration: timer.elapsed,
          entries: [entry],
        };
        setCurrentSession(newSession);
      }
    }

    if (side === 'left') {
      setLeftTimer({ startTime: null, elapsed: 0, isRunning: false });
    } else {
      setRightTimer({ startTime: null, elapsed: 0, isRunning: false });
    }
  };

  const saveSession = (side: 'left' | 'right') => {
    const timer = side === 'left' ? leftTimer : rightTimer;
    const childId = side === 'left' ? leftChildId : rightChildId;

    if (timer.startTime && childId) {
      const entry: FeedingEntry = {
        side,
        startTime: timer.startTime,
        endTime: new Date(),
        duration: timer.elapsed,
        childId,
      };

      // Add to current session or create new one
      if (currentSession) {
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                entries: [...prev.entries, entry],
                endTime: new Date(),
                totalDuration: prev.totalDuration + timer.elapsed,
              }
            : null
        );
      } else {
        const newSession: FeedingSession = {
          id: Date.now().toString(),
          startTime: timer.startTime,
          endTime: new Date(),
          totalDuration: timer.elapsed,
          entries: [entry],
        };
        setCurrentSession(newSession);
      }

      // Reset the timer after saving
      if (side === 'left') {
        setLeftTimer({ startTime: null, elapsed: 0, isRunning: false });
      } else {
        setRightTimer({ startTime: null, elapsed: 0, isRunning: false });
      }
    }
  };

  const resetTimer = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftTimer({ startTime: null, elapsed: 0, isRunning: false });
      setLeftChildId('');
    } else {
      setRightTimer({ startTime: null, elapsed: 0, isRunning: false });
      setRightChildId('');
    }
  };

  const saveAllActiveSessions = () => {
    const entries: FeedingEntry[] = [];
    let sessionStartTime = new Date();
    let totalDuration = 0;

    // Save left timer if active
    if (leftTimer.startTime && leftChildId) {
      const entry: FeedingEntry = {
        side: 'left',
        startTime: leftTimer.startTime,
        endTime: new Date(),
        duration: leftTimer.elapsed,
        childId: leftChildId,
      };
      entries.push(entry);
      sessionStartTime =
        leftTimer.startTime < sessionStartTime ? leftTimer.startTime : sessionStartTime;
      totalDuration += leftTimer.elapsed;
      setLeftTimer({ startTime: null, elapsed: 0, isRunning: false });
    }

    // Save right timer if active
    if (rightTimer.startTime && rightChildId) {
      const entry: FeedingEntry = {
        side: 'right',
        startTime: rightTimer.startTime,
        endTime: new Date(),
        duration: rightTimer.elapsed,
        childId: rightChildId,
      };
      entries.push(entry);
      sessionStartTime =
        rightTimer.startTime < sessionStartTime ? rightTimer.startTime : sessionStartTime;
      totalDuration += rightTimer.elapsed;
      setRightTimer({ startTime: null, elapsed: 0, isRunning: false });
    }

    if (entries.length > 0) {
      if (currentSession) {
        // Add to existing session
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                entries: [...prev.entries, ...entries],
                endTime: new Date(),
                totalDuration: prev.totalDuration + totalDuration,
              }
            : null
        );
      } else {
        // Create new session
        const newSession: FeedingSession = {
          id: Date.now().toString(),
          startTime: sessionStartTime,
          endTime: new Date(),
          totalDuration,
          entries,
        };
        setCurrentSession(newSession);
      }
    }
  };

  const resetAllTimers = () => {
    setLeftTimer({ startTime: null, elapsed: 0, isRunning: false });
    setRightTimer({ startTime: null, elapsed: 0, isRunning: false });
    setLeftChildId('');
    setRightChildId('');
    setBottleChildId('');
    setBottleAmount('');
  };

  const saveBottleFeeding = () => {
    if (bottleChildId && bottleAmount) {
      const now = new Date();
      const entry: FeedingEntry = {
        side: 'bottle',
        startTime: now,
        endTime: now,
        duration: 0, // Bottle feeding is instantaneous
        childId: bottleChildId,
        amount: parseInt(bottleAmount),
      };

      // Add to current session or create new one
      if (currentSession) {
        setCurrentSession((prev) =>
          prev
            ? {
                ...prev,
                entries: [...prev.entries, entry],
                endTime: new Date(),
                totalDuration: prev.totalDuration, // Don't add duration for bottle
              }
            : null
        );
      } else {
        const newSession: FeedingSession = {
          id: Date.now().toString(),
          startTime: now,
          endTime: now,
          totalDuration: 0,
          entries: [entry],
        };
        setCurrentSession(newSession);
      }

      // Reset bottle fields
      setBottleChildId('');
      setBottleAmount('');
    }
  };

  const finishCurrentSession = () => {
    if (currentSession) {
      setPreviousSessions((prev) => [currentSession, ...prev]);
      setCurrentSession(null);
    }
  };

  const deleteCurrentSession = () => {
    setCurrentSession(null);
  };

  const deletePreviousSession = (sessionId: string) => {
    setPreviousSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const updateSession = (sessionId: string, updates: Partial<FeedingSession>) => {
    setPreviousSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, ...updates } : s)));
  };

  const getChildName = (childId: string) => {
    return children.find((c) => c.id === childId)?.name || 'Unknown';
  };

  const getTodaysSessions = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return previousSessions.filter((s) => s.startTime >= today);
  };

  const getCurrentSessionEntries = () => {
    return currentSession?.entries || [];
  };

  const todaysSessions = getTodaysSessions();
  const currentEntries = getCurrentSessionEntries();
  const allTodaysEntries = [...todaysSessions.flatMap((s) => s.entries), ...currentEntries];
  const totalDuration = allTodaysEntries.reduce((sum, e) => sum + e.duration, 0);
  const avgDuration =
    allTodaysEntries.length > 0 ? Math.round(totalDuration / allTodaysEntries.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/tools"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 mb-4"
          >
            <X className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <Baby className="inline w-8 h-8 mr-3 text-pink-600" />
            Breastfeeding Timer
          </h1>
          <p className="text-gray-600 text-lg">
            Track feeding sessions with ease and keep a detailed history
          </p>
        </div>

        {/* Today's Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">{allTodaysEntries.length}</div>
              <div className="text-gray-600">Feeds Today</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatTime(totalDuration)}
              </div>
              <div className="text-gray-600">Total Duration</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatTime(avgDuration)}
              </div>
              <div className="text-gray-600">Average Feed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Timer Card with Child Background */}
        <Card className="bg-gradient-to-br from-pink-100 via-blue-50 to-purple-100 shadow-xl mb-8 relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 opacity-15">
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop&crop=center"
              alt="Child background"
              className="w-full h-full object-cover"
            />
          </div>

          <CardHeader className="relative z-10 text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <Baby className="w-6 h-6 mr-2 text-pink-600" />
              Active Feeding Session
            </CardTitle>
          </CardHeader>

          <CardContent className="relative z-10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Breast Card */}
              <Card className="bg-white/50 backdrop-blur-sm shadow-md border border-pink-200 rounded-2xl">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                    🍈 Left Breast
                  </CardTitle>
                  <div className="text-3xl font-mono font-bold text-pink-600">
                    {formatTime(leftTimer.elapsed)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pb-4">
                  <Select value={leftChildId} onValueChange={setLeftChildId}>
                    <SelectTrigger className="w-full h-9 rounded-xl">
                      <SelectValue placeholder="Select child" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          <div className="flex items-center space-x-2">
                            <img
                              src={child.profileImage}
                              alt={child.name}
                              className="w-5 h-5 rounded-full"
                            />
                            <span>{child.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex space-x-2">
                    {!leftTimer.isRunning ? (
                      <Button
                        onClick={() => startTimer('left')}
                        disabled={!leftChildId}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9 rounded-xl text-sm"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={() => pauseTimer('left')}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white h-9 rounded-xl text-sm"
                      >
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    )}

                    <Button
                      onClick={() => stopTimer('left')}
                      disabled={!leftTimer.startTime}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 h-9 rounded-xl text-sm"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Right Breast Card */}
              <Card className="bg-white/50 backdrop-blur-sm shadow-md border border-blue-200 rounded-2xl">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                    🍈 Right Breast
                  </CardTitle>
                  <div className="text-3xl font-mono font-bold text-blue-600">
                    {formatTime(rightTimer.elapsed)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pb-4">
                  <Select value={rightChildId} onValueChange={setRightChildId}>
                    <SelectTrigger className="w-full h-9 rounded-xl">
                      <SelectValue placeholder="Select child" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          <div className="flex items-center space-x-2">
                            <img
                              src={child.profileImage}
                              alt={child.name}
                              className="w-5 h-5 rounded-full"
                            />
                            <span>{child.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex space-x-2">
                    {!rightTimer.isRunning ? (
                      <Button
                        onClick={() => startTimer('right')}
                        disabled={!rightChildId}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white h-9 rounded-xl text-sm"
                      >
                        <Play className="w-3 h-3 mr-1" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={() => pauseTimer('right')}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white h-9 rounded-xl text-sm"
                      >
                        <Pause className="w-3 h-3 mr-1" />
                        Pause
                      </Button>
                    )}

                    <Button
                      onClick={() => stopTimer('right')}
                      disabled={!rightTimer.startTime}
                      variant="outline"
                      className="flex-1 border-red-300 text-red-600 hover:bg-red-50 h-9 rounded-xl text-sm"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Stop
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Bottle Feeding Card */}
              <Card className="bg-white/50 backdrop-blur-sm shadow-md border border-green-200 rounded-2xl">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg font-semibold text-gray-800 flex items-center justify-center">
                    🍼 Bottle Feed
                  </CardTitle>
                  <div className="text-sm text-gray-600">Record bottle feeding</div>
                </CardHeader>
                <CardContent className="space-y-3 px-4 pb-4">
                  <Select value={bottleChildId} onValueChange={setBottleChildId}>
                    <SelectTrigger className="w-full h-9 rounded-xl">
                      <SelectValue placeholder="Select child" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map((child) => (
                        <SelectItem key={child.id} value={child.id}>
                          <div className="flex items-center space-x-2">
                            <img
                              src={child.profileImage}
                              alt={child.name}
                              className="w-5 h-5 rounded-full"
                            />
                            <span>{child.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="relative">
                    <input
                      type="number"
                      value={bottleAmount}
                      onChange={(e) => setBottleAmount(e.target.value)}
                      placeholder="Amount"
                      className="w-full h-9 px-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                      ml
                    </span>
                  </div>

                  <Button
                    onClick={saveBottleFeeding}
                    disabled={!bottleChildId || !bottleAmount}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-9 rounded-xl text-sm"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Save Feed
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <button
                    onClick={() => setActiveTab('current')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'current'
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    This Session
                  </button>
                  <button
                    onClick={() => setActiveTab('previous')}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === 'previous'
                        ? 'bg-pink-100 text-pink-700'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Previous Sessions
                  </button>
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-gray-600" />
                  {activeTab === 'current' ? 'Current Session History' : 'Previous Sessions'}
                </CardTitle>
                <p className="text-gray-600">
                  {activeTab === 'current'
                    ? 'Track feeds in your current session'
                    : 'View and edit your completed sessions'}
                </p>
              </div>

              {/* Session Management Buttons */}
              {activeTab === 'current' ? (
                <div className="flex space-x-3">
                  {(leftTimer.startTime || rightTimer.startTime) && (
                    <Button
                      onClick={saveAllActiveSessions}
                      className="bg-green-600 hover:bg-green-700 text-white h-9 px-4 rounded-xl"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Save Feed
                    </Button>
                  )}
                  {currentSession && (
                    <Button
                      onClick={finishCurrentSession}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 rounded-xl"
                    >
                      <Baby className="w-4 h-4 mr-2" />
                      Finish Session
                    </Button>
                  )}
                  <Button
                    onClick={resetAllTimers}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50 h-9 px-4 rounded-xl"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reset All
                  </Button>
                </div>
              ) : (
                <div className="text-sm text-gray-500">
                  {previousSessions.length} completed session
                  {previousSessions.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {activeTab === 'current' ? (
              // Current Session View
              currentEntries.length === 0 ? (
                <div className="text-center py-8">
                  <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No feeds in current session</p>
                  <p className="text-sm text-gray-400">Start your first feed above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Current Session Summary */}
                  {currentSession && (
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-blue-800">Current Session</h4>
                          <p className="text-sm text-blue-600">
                            Started:{' '}
                            {currentSession.startTime.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}{' '}
                            • Total: {formatTime(currentSession.totalDuration)} • Feeds:{' '}
                            {currentSession.entries.length}
                          </p>
                        </div>
                        <Button
                          onClick={deleteCurrentSession}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Current Session Entries */}
                  <div className="grid grid-cols-6 gap-4 p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
                    <div>Child & Type</div>
                    <div>Start Time</div>
                    <div>End Time</div>
                    <div>Duration</div>
                    <div>Amount</div>
                    <div>Actions</div>
                  </div>

                  {currentEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 p-4 border rounded-lg hover:bg-gray-50 items-center"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            entry.side === 'left'
                              ? 'bg-pink-500'
                              : entry.side === 'right'
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}
                        ></div>
                        <div>
                          <div className="font-medium text-gray-800 text-sm">
                            {getChildName(entry.childId)}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {entry.side === 'bottle' ? '🍼 bottle' : `🍈 ${entry.side} breast`}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          {entry.startTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-sm">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          {entry.endTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </span>
                      </div>

                      <div className="text-sm font-mono text-gray-700">
                        {entry.side === 'bottle' ? '-' : formatTime(entry.duration)}
                      </div>

                      <div className="text-sm font-medium text-gray-700">
                        {entry.amount ? `${entry.amount}ml` : '-'}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSession(`entry_${index}`)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : // Previous Sessions View
            previousSessions.length === 0 ? (
              <div className="text-center py-8">
                <Baby className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No completed sessions yet</p>
                <p className="text-sm text-gray-400">Complete your first session to see it here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {previousSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Session {session.startTime.toLocaleDateString()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {session.startTime.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          -{' '}
                          {session.endTime?.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}{' '}
                          • Total: {formatTime(session.totalDuration)} • Feeds:{' '}
                          {session.entries.length}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingSession(session.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deletePreviousSession(session.id)}
                          className="text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Session Entries */}
                    <div className="space-y-2">
                      {session.entries.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                entry.side === 'left'
                                  ? 'bg-pink-500'
                                  : entry.side === 'right'
                                  ? 'bg-blue-500'
                                  : 'bg-green-500'
                              }`}
                            ></div>
                            <span className="text-sm text-gray-700">
                              {getChildName(entry.childId)} -{' '}
                              {entry.side === 'bottle' ? '🍼 bottle' : `🍈 ${entry.side} breast`}
                              {entry.amount && ` (${entry.amount}ml)`}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.side === 'bottle'
                              ? `${entry.amount}ml`
                              : formatTime(entry.duration)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
