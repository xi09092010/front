// ຕັ້ງຄ່າ Base URL ຂອງ NestJS API (ປ່ຽນ Port ຫຼື Domain ຕາມຕົວຈິງ)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Structure ຂອງຂໍ້ມູນເອກະສານ
export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  owner: string;
  status: 'Approved' | 'Pending' | 'Draft' | 'Rejected';
  fileUrl: string;
  size: string;
  createdAt: string;
}

// Structure ຂອງຂໍ້ມູນ Dashboard Stats
export interface DashboardStats {
  totalDocuments: number;
  pendingApprovals: number;
  totalCategories: number;
}

export const dmsApi = {
  // 1. ດຶງຂໍ້ມູນສະຖິຕິ Dashboard
  getStats: async (): Promise<DashboardStats> => {
    const res = await fetch(`${API_BASE_URL}/documents/stats`, {
      cache: 'no-store', // ເພື່ອໃຫ້ໄດ້ຂໍ້ມູນ Real-time ເສີມ
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // 2. ດຶງລາຍການເອກະສານທັງໝົດ
  getDocuments: async (): Promise<DocumentItem[]> => {
    const res = await fetch(`${API_BASE_URL}/documents`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  // 3. ອັບໂຫຼດເອກະສານໃໝ່ໄປຫາ NestJS
  uploadDocument: async (formData: FormData): Promise<DocumentItem> => {
    const res = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      body: formData, // ສົ່ງເປັນ Multipart/form-data
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
  },

  // 4. ລຶບເອກະສານ
  deleteDocument: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  }

};

const getToken = () => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; token=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'ເກີດຂໍ້ຜິດພາດໃນການເຊື່ອມຕໍ່ API');
  }

  return response.json();
};