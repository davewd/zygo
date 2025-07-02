// useAsyncData Migration Examples
// Advanced patterns and edge cases

import { useAsyncData, useMultipleAsyncData } from '../hooks/useAsyncData';

// =====================================================
// EXAMPLE 1: Simple Data Fetching
// =====================================================

// BEFORE
const SimpleComponentBefore = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{users.length} users found</div>;
};

// AFTER
const SimpleComponentAfter = () => {
  const {
    data: users = [],
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    const response = await fetchUsers();
    return response.data;
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error} <button onClick={retry}>Retry</button>
      </div>
    );
  return <div>{users.length} users found</div>;
};

// =====================================================
// EXAMPLE 2: Data Fetching with Dependencies
// =====================================================

// BEFORE
const DetailComponentBefore = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetchUserById(id);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;
  return <div>User: {user.name}</div>;
};

// AFTER
const DetailComponentAfter = () => {
  const { id } = useParams();
  const {
    data: user,
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    if (!id) return null;
    const response = await fetchUserById(id);
    return response.data;
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error} <button onClick={retry}>Retry</button>
      </div>
    );
  if (!user) return <div>User not found</div>;
  return <div>User: {user.name}</div>;
};

// =====================================================
// EXAMPLE 3: Multiple Data Sources
// =====================================================

// BEFORE
const DashboardBefore = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersRes, postsRes, statsRes] = await Promise.all([
          fetchUsers(),
          fetchPosts(),
          fetchStats(),
        ]);
        setUsers(usersRes.data);
        setPosts(postsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>Users: {users.length}</div>
      <div>Posts: {posts.length}</div>
      <div>Total Views: {stats?.totalViews}</div>
    </div>
  );
};

// AFTER
const DashboardAfter = () => {
  const { data, loading, error, retry } = useMultipleAsyncData(
    {
      users: async () => {
        const response = await fetchUsers();
        return response.data;
      },
      posts: async () => {
        const response = await fetchPosts();
        return response.data;
      },
      stats: async () => {
        const response = await fetchStats();
        return response.data;
      },
    },
    []
  );

  const users = data.users || [];
  const posts = data.posts || [];
  const stats = data.stats;

  if (loading) return <div>Loading dashboard...</div>;
  if (error)
    return (
      <div>
        Error: {error} <button onClick={retry}>Retry</button>
      </div>
    );

  return (
    <div>
      <div>Users: {users.length}</div>
      <div>Posts: {posts.length}</div>
      <div>Total Views: {stats?.totalViews}</div>
    </div>
  );
};

// =====================================================
// EXAMPLE 4: Complex Conditional Logic
// =====================================================

// BEFORE
const ProfileBefore = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      try {
        setLoading(true);
        let response;

        // Try different endpoints based on ID format
        if (id.startsWith('user_')) {
          response = await fetchUserProfile(id);
        } else if (id.startsWith('@')) {
          response = await fetchProfileByHandle(id.slice(1));
        } else {
          response = await fetchProfileBySlug(id);
        }

        if (response.data) {
          setProfile(response.data);
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [id]);

  // Component render logic...
};

// AFTER
const ProfileAfter = () => {
  const { id } = useParams();
  const {
    data: profile,
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    if (!id) return null;

    let response;

    // Try different endpoints based on ID format
    if (id.startsWith('user_')) {
      response = await fetchUserProfile(id);
    } else if (id.startsWith('@')) {
      response = await fetchProfileByHandle(id.slice(1));
    } else {
      response = await fetchProfileBySlug(id);
    }

    if (response.data) {
      return response.data;
    } else {
      throw new Error('Profile not found');
    }
  }, [id]);

  // Component render logic...
};

// =====================================================
// EXAMPLE 5: Error Handling Patterns
// =====================================================

// Custom error handling with different error types
const AdvancedErrorHandling = () => {
  const { data, loading, error, retry } = useAsyncData(async () => {
    const response = await fetchData();

    // Handle different response formats
    if (response.success && response.data) {
      return response.data;
    } else if (response.error) {
      throw new Error(response.error);
    } else {
      throw new Error('Unknown error occurred');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-700">⚠️ {error}</span>
          <button
            onClick={retry}
            className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <div>Data loaded successfully: {data?.length} items</div>;
};

// =====================================================
// MIGRATION CHECKLIST
// =====================================================

/*
Migration Checklist:

1. ✅ Import useAsyncData or useMultipleAsyncData
2. ✅ Remove useState for data, loading, error
3. ✅ Remove useEffect for data fetching
4. ✅ Move async logic into hook function
5. ✅ Update dependencies array
6. ✅ Handle null/undefined data with defaults
7. ✅ Update error display to include retry button
8. ✅ Test loading states
9. ✅ Test error states and retry functionality
10. ✅ Verify component still works as expected

Benefits after migration:
- ✅ Less boilerplate code
- ✅ Consistent error handling
- ✅ Built-in retry functionality
- ✅ Better TypeScript support
- ✅ Easier testing
- ✅ More maintainable code
*/

export {
  AdvancedErrorHandling,
  DashboardAfter,
  DetailComponentAfter,
  ProfileAfter,
  SimpleComponentAfter,
};
