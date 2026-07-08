/* src/context/AppContext.jsx */
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eco-theme') || 'dark';
  });

  // User Authentication State
 const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem('eco-user');
  return savedUser ? JSON.parse(savedUser) : null;
});
  // Complaints State
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('eco-complaints');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'c1',
        title: 'Chemical Runoff in Green Valley Creek',
        category: 'Water Quality',
        severity: 'Critical',
        description: 'Noticeable oily sheen and foam appearing near the industrial discharge pipe. The local wildlife has been affected, and there is a distinct chemical odor.',
        location: { lat: 37.7749, lng: -122.4194, address: 'Green Valley Creek, Sector 4' },
        status: 'AI Verified', // Citizen Filed -> AI Verified -> Community Validated -> Assigned to Gov -> Resolved
        images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'],
        video: null,
        reporter: 'Alice Woods',
        filedDate: '2026-06-28',
        votes: 18,
        voters: ['EcoCitizen'],
        timeline: [
          { status: 'Citizen Filed', date: '2026-06-28', comment: 'Complaint submitted by Alice Woods.' },
          { status: 'AI Verified', date: '2026-06-28', comment: 'AI analysis verified toxic sheen and matched it with previous local discharge patterns.' }
        ]
      },
      {
        id: 'c2',
        title: 'Unlawful Logging in Sector B Forest Preserve',
        category: 'Deforestation',
        severity: 'High',
        description: 'Encountered heavy clearing machinery operating during non-permitted hours in the protected woodland boundary.',
        location: { lat: 37.8044, lng: -122.2711, address: 'Oakwood Preserve Boundary' },
        status: 'Assigned to Gov',
        images: ['https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80'],
        video: null,
        reporter: 'Bob Miller',
        filedDate: '2026-06-20',
        votes: 42,
        voters: [],
        timeline: [
          { status: 'Citizen Filed', date: '2026-06-20', comment: 'Filed by Bob Miller.' },
          { status: 'AI Verified', date: '2026-06-20', comment: 'AI localized coordinates inside the protected zone boundary.' },
          { status: 'Community Validated', date: '2026-06-21', comment: 'Validated by 30+ verified community reports.' },
          { status: 'Assigned to Gov', date: '2026-06-22', comment: 'Escalated to State Environmental Protection Agency, Ref #492-LOG.' }
        ]
      },
      {
        id: 'c3',
        title: 'Illegal Dumping of E-Waste near Reservoir Road',
        category: 'Plastic Waste',
        severity: 'Medium',
        description: 'Dozens of discarded computer monitors, batteries, and old wiring have been dumped along the shoulder of the road, close to the municipal watershed.',
        location: { lat: 37.6879, lng: -122.4702, address: 'Reservoir Rd, South Hills' },
        status: 'Resolved',
        images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80'],
        video: null,
        reporter: 'Sarah Jenkins',
        filedDate: '2026-06-15',
        votes: 25,
        voters: [],
        timeline: [
          { status: 'Citizen Filed', date: '2026-06-15', comment: 'Reported by Sarah.' },
          { status: 'AI Verified', date: '2026-06-15', comment: 'AI scanned images and classified them as hazardous electronic scrap.' },
          { status: 'Community Validated', date: '2026-06-16', comment: 'Verified by local residents.' },
          { status: 'Assigned to Gov', date: '2026-06-17', comment: 'Assigned to Municipal Clean-up Authority.' },
          { status: 'Resolved', date: '2026-06-18', comment: 'Clean-up crew cleared the debris. Site monitored.' }
        ]
      }
    ];
  });

  // Petitions State
  const [petitions, setPetitions] = useState(() => {
    const saved = localStorage.getItem('eco-petitions');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'p1',
        title: 'Transition City Buses to 100% Electric by 2028',
        description: 'Our city transportation system is responsible for 35% of local diesel particulate emissions. By transitioning the bus fleet to electric vehicles, we can offset thousands of tons of carbon dioxide and improve public health in low-income neighborhoods.',
        targetSignatures: 1000,
        creator: 'EcoVoice Global',
        createdDate: '2026-06-01',
        signaturesCount: 782,
        signatures: [
          { name: 'Alice Woods', comment: 'Clean air is a basic human right.', date: '2026-06-02' },
          { name: 'Marcus Sterling', comment: 'Fully support this. Our kids deserve clean bus rides.', date: '2026-06-02' },
          { name: 'EcoCitizen', comment: 'Crucial step for municipal carbon goals!', date: '2026-07-01' }
        ],
        category: 'Carbon Emissions'
      },
      {
        id: 'p2',
        title: 'Ban Single-Use Plastic Wraps in Fresh Produce Markets',
        description: 'Supermarkets are wrapping organic cucumbers, bananas, and apples in layers of non-recyclable plastic wraps. We demand ordinances requiring biodegradable alternatives or package-free options.',
        targetSignatures: 500,
        creator: 'Sarah Jenkins',
        createdDate: '2026-06-10',
        signaturesCount: 310,
        signatures: [
          { name: 'Bob Miller', comment: 'Nature already wrapped bananas!', date: '2026-06-11' },
          { name: 'Diana Prince', comment: 'Microplastics are in our food. Let us stop this now.', date: '2026-06-12' }
        ],
        category: 'Plastic Waste'
      }
    ];
  });

  // Community Feed State
  const [posts, setPosts] = useState(() => {
  const saved = localStorage.getItem('eco-posts');
  if (saved) return JSON.parse(saved);
  return [
  {
    id: 'post1',
    author: {
      username: 'Prof_Evelyn',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      title: 'Climate Scientist'
    },
    title: 'Why Global Methane Levels Are the Next Urgent Frontier',
    content: 'While CO2 is the primary driver of long-term warming, methane holds 80x the warming potential of CO2 over a 20-year timescale. Tackling agricultural emissions and repairing gas pipeline leaks is the fastest way to slow immediate temperature increases.',
    category: 'Atmosphere',
    likes: 54,
    likedBy: [],
    comments: [
      {
        author: 'Jane Doe',
        avatar: '',
        content: 'Agreed! Landfill management is another key area we can improve.',
        date: '2026-07-01'
      }
    ],
    date: '2026-07-02',
    poll: null
  },

  {
    id: 'post2',
    author: {
      username: 'EcoVoice Team',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      title: 'Admin'
    },
    title: 'COMMUNITY POLL: What is your primary mode of commute?',
    content: 'We are compiling a report on local transit habits to send to the municipal planners. Let us know how you primarily get to work or school.',
    category: 'Discussion',
    likes: 29,
    likedBy: [],
    comments: [],
    date: '2026-07-01',
    poll: {
      question: 'What is your primary commute method?',
      options: [
        { text: 'Walk / Bicycle', votes: 142 },
        { text: 'Public Transit (Bus/Train)', votes: 218 },
        { text: 'Electric Vehicle', votes: 65 },
        { text: 'Petrol/Diesel Car', votes: 110 }
      ],
      userVotedOption: null
    }
  },

  {
    id: 'post3',
    author: {
      username: 'Dr_Aqua',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      title: 'Water Quality Expert'
    },
    title: 'River Water Quality is Declining',
    content: 'Industrial waste and sewage are polluting rivers. Communities should work together to protect clean water resources.',
    category: 'Water Quality',
    likes: 35,
    likedBy: [],
    comments: [],
    date: '2026-07-03',
    poll: null
  },

  {
    id: 'post4',
    author: {
      username: 'ForestGuardian',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      title: 'Environmental Activist'
    },
    title: 'Save Our Forests',
    content: 'Deforestation is increasing every year. Planting trees and protecting forests can help preserve biodiversity.',
    category: 'Deforestation',
    likes: 42,
    likedBy: [],
    comments: [],
    date: '2026-07-03',
    poll: null
  },

  {
    id: 'post5',
    author: {
      username: 'RecycleHero',
      avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=150&q=80',
      title: 'Recycling Specialist'
    },
    title: 'Reduce Plastic Waste',
    content: 'Reducing single-use plastics and recycling waste can make our environment cleaner and healthier.',
    category: 'Plastic Waste',
    likes: 50,
    likedBy: [],
    comments: [],
    date: '2026-07-04',
    poll: null
  }
];
})

  // Carbon Calculator Logs State
  const [carbonLogs, setCarbonLogs] = useState(() => {
    const saved = localStorage.getItem('eco-carbon-logs');
    return saved ? JSON.parse(saved) : [
      { date: '2026-04-10', totalScore: 8.4, label: 'April Estimate' },
      { date: '2026-05-15', totalScore: 7.2, label: 'May Reductions' },
      { date: '2026-06-20', totalScore: 5.9, label: 'June Offsets' }
    ];
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 'n1', type: 'warning', text: 'Air Quality Index has reached 145 (Unhealthy for Sensitive Groups) in your area.', date: 'Just Now', read: false },
    { id: 'n2', type: 'success', text: 'Your complaint regarding "E-Waste Dumping" was successfully marked as RESOLVED.', date: '1 Day Ago', read: true },
    { id: 'n3', type: 'info', text: 'New local clean-up event: Volunteer this Saturday at Sector 4 Park.', date: '2 Days Ago', read: true }
  ]);

  // Toast Alerts (volatile state)
  const [toasts, setToasts] = useState([]);

  // Apply Theme class to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('eco-theme', theme);
  }, [theme]);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('eco-complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('eco-petitions', JSON.stringify(petitions));
  }, [petitions]);

  useEffect(() => {
    localStorage.setItem('eco-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('eco-carbon-logs', JSON.stringify(carbonLogs));
  }, [carbonLogs]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eco-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eco-user');
    }
  }, [user]);

  // Actions
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    addToast('Theme toggled!', 'info');
  };

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const login = (email, password) => {
    // Simulated validation
    if (!email || !password) {
      addToast('Please fill all fields', 'danger');
      return false;
    }
    const username = email.split('@')[0];
    const newUser = {
      username: username.charAt(0).toUpperCase() + username.slice(1),
      email,
      ecoScore: 100,
      volunteerHours: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    };
    setUser(newUser);
    addToast(`Welcome back, ${newUser.username}!`, 'success');
    return true;
  };

  const register = (username, email, password) => {
    if (!username || !email || !password) {
      addToast('Please fill in all registration fields', 'danger');
      return false;
    }
    const newUser = {
      username,
      email,
      ecoScore: 50,
      volunteerHours: 0,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    };
    setUser(newUser);
    addToast('Account created successfully! Welcome to EcoVoice Global!', 'success');
    return true;
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem('eco-user');
  localStorage.removeItem('user');
  addToast('Successfully signed out.', 'info');
};

  // Complaint Management
  const addComplaint = (complaintData) => {
    const newComplaint = {
      id: `c${Date.now()}`,
      title: complaintData.title,
      category: complaintData.category,
      severity: complaintData.severity,
      description: complaintData.description,
      location: {
        lat: complaintData.lat || 37.7749,
        lng: complaintData.lng || -122.4194,
        address: complaintData.address || 'Reported Location'
      },
      status: 'Citizen Filed',
      images: complaintData.images || [],
      video: complaintData.video || null,
      reporter: user ? user.username : 'Anonymous Citizen',
      filedDate: new Date().toISOString().split('T')[0],
      votes: 1,
      voters: [user ? user.username : 'Anonymous'],
      timeline: [
        { status: 'Citizen Filed', date: new Date().toISOString().split('T')[0], comment: 'Complaint submitted by reporting citizen.' }
      ]
    };

    setComplaints(prev => [newComplaint, ...prev]);
    
    // Increment eco-score
    if (user) {
      setUser(prev => ({
        ...prev,
        ecoScore: prev.ecoScore + 30
      }));
    }

    addToast('Complaint submitted successfully! AI scanning initiated.', 'success');

    // Simulate AI Verifying after 3 seconds
    setTimeout(() => {
      setComplaints(prev => 
        prev.map(c => {
          if (c.id === newComplaint.id) {
            return {
              ...c,
              status: 'AI Verified',
              timeline: [
                ...c.timeline,
                { status: 'AI Verified', date: new Date().toISOString().split('T')[0], comment: 'AI verification complete: Image content matched pollution indicators.' }
              ]
            };
          }
          return c;
        })
      );
      addNotification('warning', `AI analysis verified your complaint: "${newComplaint.title}"`);
    }, 4000);
  };

  const voteComplaint = (complaintId) => {
    if (!user) {
      addToast('Please login to validate complaints', 'warning');
      return;
    }
    setComplaints(prev => 
      prev.map(c => {
        if (c.id === complaintId) {
          if (c.voters.includes(user.username)) {
            addToast('You have already validated this complaint', 'info');
            return c;
          }
          const updatedVotes = c.votes + 1;
          const updatedVoters = [...c.voters, user.username];
          let updatedStatus = c.status;
          let updatedTimeline = [...c.timeline];

          // Trigger Community Validated if votes cross a threshold (e.g. 5)
          if (updatedVotes >= 5 && c.status === 'AI Verified') {
            updatedStatus = 'Community Validated';
            updatedTimeline.push({
              status: 'Community Validated',
              date: new Date().toISOString().split('T')[0],
              comment: 'Complaint validated by consensus community vote.'
            });
            addNotification('info', `Complaint "${c.title}" has reached Community Validated status.`);
          }

          addToast('Thank you for validating this report!', 'success');
          // Increment score slightly
          setUser(prev => ({ ...prev, ecoScore: prev.ecoScore + 5 }));

          return {
            ...c,
            votes: updatedVotes,
            voters: updatedVoters,
            status: updatedStatus,
            timeline: updatedTimeline
          };
        }
        return c;
      })
    );
  };

  // Petition System
  const addPetition = (petitionData) => {
    const newPetition = {
      id: `p${Date.now()}`,
      title: petitionData.title,
      description: petitionData.description,
      targetSignatures: petitionData.targetSignatures || 500,
      creator: user ? user.username : 'EcoVoice Member',
      createdDate: new Date().toISOString().split('T')[0],
      signaturesCount: 1,
      category: petitionData.category || 'General Sustainability',
      signatures: [
        { name: user ? user.username : 'EcoCitizen', comment: 'Initiated this petition.', date: new Date().toISOString().split('T')[0] }
      ]
    };
    setPetitions(prev => [newPetition, ...prev]);
    if (user) {
      setUser(prev => ({ ...prev, ecoScore: prev.ecoScore + 40 }));
    }
    addToast('Petition successfully launched!', 'success');
  };

  const signPetition = (petitionId, name, comment) => {
    setPetitions(prev => 
      prev.map(p => {
        if (p.id === petitionId) {
          const alreadySigned = p.signatures.some(s => s.name === name);
          if (alreadySigned) {
            addToast('You have already signed this petition!', 'info');
            return p;
          }
          const updatedSignatures = [...p.signatures, { name, comment, date: new Date().toISOString().split('T')[0] }];
          addToast('Petition signed successfully!', 'success');
          
          if (user) {
            setUser(prev => ({ ...prev, ecoScore: prev.ecoScore + 10 }));
          }

          return {
            ...p,
            signaturesCount: p.signaturesCount + 1,
            signatures: updatedSignatures
          };
        }
        return p;
      })
    );
  };

  // Community Feed Actions
  const addPost = (postData) => {
    const newPost = {
      id: `post${Date.now()}`,
      author: {
        username: user ? user.username : 'EcoCitizen',
        avatar: user ? user.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        title: 'Active Advocate'
      },
      title: postData.title,
      content: postData.content,
      category: postData.category || 'Discussion',
      likes: 0,
      likedBy: [],
      comments: [],
      date: new Date().toISOString().split('T')[0],
      poll: postData.pollOptions && postData.pollOptions.length > 0 ? {
        question: postData.pollQuestion || postData.title,
        options: postData.pollOptions.map(opt => ({ text: opt, votes: 0 })),
        userVotedOption: null
      } : null
    };

    setPosts(prev => [newPost, ...prev]);
    if (user) {
      setUser(prev => ({ ...prev, ecoScore: prev.ecoScore + 15 }));
    }
    addToast('Post published to Eco Feed!', 'success');
  };

  const likePost = (postId) => {
    if (!user) {
      addToast('Please login to like posts', 'warning');
      return;
    }
    setPosts(prev => 
      prev.map(p => {
        if (p.id === postId) {
          const hasLiked = p.likedBy.includes(user.username);
          if (hasLiked) {
            // Unlike
            return {
              ...p,
              likes: p.likes - 1,
              likedBy: p.likedBy.filter(u => u !== user.username)
            };
          } else {
            // Like
            return {
              ...p,
              likes: p.likes + 1,
              likedBy: [...p.likedBy, user.username]
            };
          }
        }
        return p;
      })
    );
  };

  const addCommentToPost = (postId, commentContent) => {
    if (!user) {
      addToast('Please login to comment', 'warning');
      return;
    }
    if (!commentContent.trim()) return;

    setPosts(prev => 
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [
              ...p.comments,
              {
                author: user.username,
                avatar: user.avatar,
                content: commentContent,
                date: new Date().toISOString().split('T')[0]
              }
            ]
          };
        }
        return p;
      })
    );
    addToast('Comment added.', 'success');
  };

  const votePoll = (postId, optionIndex) => {
    if (!user) {
      addToast('Please login to vote', 'warning');
      return;
    }

    setPosts(prev => 
      prev.map(p => {
        if (p.id === postId && p.poll) {
          if (p.poll.userVotedOption !== null) {
            addToast('You have already voted in this poll', 'info');
            return p;
          }

          const updatedOptions = p.poll.options.map((opt, i) => {
            if (i === optionIndex) {
              return { ...opt, votes: opt.votes + 1 };
            }
            return opt;
          });

          addToast('Vote registered!', 'success');
          setUser(prev => ({ ...prev, ecoScore: prev.ecoScore + 5 }));

          return {
            ...p,
            poll: {
              ...p.poll,
              options: updatedOptions,
              userVotedOption: optionIndex
            }
          };
        }
        return p;
      })
    );
  };

  // Carbon Logs
  const addCarbonLog = (logScore, label) => {
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      totalScore: parseFloat(logScore),
      label: label || 'Footprint Calculator'
    };
    setCarbonLogs(prev => [...prev, newLog]);
    
    // Add Eco Score bonus
    if (user) {
      setUser(prev => ({
        ...prev,
        ecoScore: prev.ecoScore + 25
      }));
    }
    addToast('Calculations saved! Recommendations listed below.', 'success');
  };

  // Notifications
  const addNotification = (type, text) => {
    const newNotif = {
      id: `n${Date.now()}`,
      type,
      text,
      date: 'Just Now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      user,
      login,
      register,
      logout,
      complaints,
      addComplaint,
      voteComplaint,
      petitions,
      addPetition,
      signPetition,
      posts,
      addPost,
      likePost,
      addCommentToPost,
      votePoll,
      carbonLogs,
      addCarbonLog,
      notifications,
      markAllNotificationsRead,
      toasts,
      addToast,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
