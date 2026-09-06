import axios from 'axios';

export const API = "/api";

let requests = [
  {
    id: 1,
    reference: "REQ-001",
    full_name: "Alice Johnson",
    work_email: "alice@example.com",
    organization_type: "Research institution",
    compute_pflops: 10,
    use_case: "Simulating protein folding at scale.",
    status: "new",
    created_at: new Date().toISOString()
  }
];

axios.interceptors.request.use((config) => {
  if (config.url.startsWith(API + '/access-requests')) {
    config.adapter = async (cfg) => {
      await new Promise(r => setTimeout(r, 600)); // Network delay

      const method = cfg.method.toLowerCase();
      const data = cfg.data ? JSON.parse(cfg.data) : null;
      const url = cfg.url;

      if (method === 'get') {
        return { data: requests, status: 200, statusText: 'OK', config: cfg, headers: {} };
      }

      if (method === 'post') {
        const newReq = {
          id: Date.now(),
          reference: `REQ-${Math.floor(Math.random()*1000).toString().padStart(3, '0')}`,
          ...data,
          status: 'new',
          created_at: new Date().toISOString()
        };
        requests = [newReq, ...requests];
        return { data: newReq, status: 201, statusText: 'Created', config: cfg, headers: {} };
      }

      if (method === 'patch') {
        const idMatch = url.match(/\/access-requests\/(\d+)/);
        const id = idMatch ? Number(idMatch[1]) : null;
        const req = requests.find(r => r.id === id);
        if (req) {
          req.status = data.status;
          return { data: req, status: 200, statusText: 'OK', config: cfg, headers: {} };
        }
        return { data: { error: 'Not found' }, status: 404, statusText: 'Not found', config: cfg, headers: {} };
      }

      return { data: null, status: 404, statusText: 'Not found', config: cfg, headers: {} };
    };
  }
  return config;
});
