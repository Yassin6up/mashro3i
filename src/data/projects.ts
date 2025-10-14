export interface Project {
  id: number;
  title: string;
  description: string;
  price: number;
  monthlyRevenue?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  profitable: boolean;
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    totalSales: number;
  };
  technologies: string[];
  features: string[];
  demoUrl?: string;
  statistics?: {
    visitors: number;
    conversionRate: number;
    revenue: number[];
  };
}

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: "منصة التجارة الإلكترونية المتكاملة",
    description: "متجر إلكتروني متكامل مع نظام إدارة المخزون ولوحة تحكم احترافية. يحقق عوائد شهرية ثابتة من خلال العمولات والاشتراكات.",
    price: 15000,
    monthlyRevenue: 2500,
    category: "متاجر إلكترونية",
    rating: 4.9,
    reviews: 147,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "ahmed-mohammed",
      name: "أحمد محمد السيد",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 23
    },
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS"],
    features: [
      "نظام دفع متكامل مع Stripe",
      "إدارة المخزون الذكية",
      "لوحة تحكم شاملة للبائعين",
      "نظام تقييمات وتعليقات",
      "تطبيق جوال متجاوب",
      "تحليلات مبيعات متقدمة"
    ],
    demoUrl: "https://demo-ecommerce.example.com",
    statistics: {
      visitors: 15420,
      conversionRate: 3.2,
      revenue: [1800, 2100, 2400, 2500, 2700, 2900]
    }
  },
  {
    id: 2,
    title: "تطبيق إدارة المشاريع للفرق",
    description: "نظام متقدم لإدارة المشاريع والمهام مع ميزات التعاون الجماعي وتتبع الوقت. يخدم الشركات الصغيرة والمتوسطة.",
    price: 12000,
    monthlyRevenue: 1800,
    category: "أنظمة إدارة",
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "fatima-ahmed",
      name: "فاطمة أحمد علي",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 31
    },
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Material-UI"],
    features: [
      "إدارة المشاريع والمهام",
      "تتبع الوقت والإنتاجية",
      "التعاون الجماعي المباشر",
      "تقارير وتحليلات شاملة",
      "إشعارات فورية",
      "تكامل مع التقويم"
    ],
    demoUrl: "https://demo-projectmanager.example.com",
    statistics: {
      visitors: 8950,
      conversionRate: 5.1,
      revenue: [1200, 1400, 1600, 1800, 2000, 1800]
    }
  },
  {
    id: 3,
    title: "منصة التعلم الإلكتروني التفاعلية",
    description: "منصة تعليمية شاملة مع دورات تفاعلية ونظام امتحانات ذكي. تحقق إيرادات من الاشتراكات والدورات المدفوعة.",
    price: 18000,
    monthlyRevenue: 3200,
    category: "منصات تعليمية",
    rating: 4.8,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "khalid-abdulrahman",
      name: "خالد عبدالرحمن",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 18
    },
    technologies: ["Vue.js", "Laravel", "MySQL", "FFmpeg", "AWS S3"],
    features: [
      "دورات فيديو تفاعلية",
      "نظام امتحانات ذكي",
      "شهادات إنجاز معتمدة",
      "منتدى نقاش للطلاب",
      "تتبع تقدم الطلاب",
      "دفع آمن متعدد العملات"
    ],
    demoUrl: "https://demo-learning.example.com",
    statistics: {
      visitors: 22100,
      conversionRate: 2.8,
      revenue: [2400, 2800, 3000, 3200, 3500, 3800]
    }
  },
  {
    id: 4,
    title: "نظام إدارة العيادات الطبية",
    description: "حلول رقمية شاملة للعيادات والمراكز الطبية مع حجز المواعيد والسجلات الطبية الإلكترونية.",
    price: 22000,
    monthlyRevenue: 4100,
    category: "أنظمة طبية",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "dr-mariam-alzahrani",
      name: "د. مريم الزهراني",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 12
    },
    technologies: ["React", "Django", "PostgreSQL", "Redis", "Docker"],
    features: [
      "حجز المواعيد الذكي",
      "السجلات الطبية الرقمية",
      "إدارة الفواتير والمدفوعات",
      "نظام تذكير المرضى",
      "تقارير طبية مفصلة",
      "حماية بيانات عالية الأمان"
    ],
    demoUrl: "https://demo-clinic.example.com",
    statistics: {
      visitors: 12400,
      conversionRate: 6.2,
      revenue: [3200, 3600, 3800, 4100, 4400, 4700]
    }
  },
  {
    id: 5,
    title: "تطبيق توصيل الطعام الذكي",
    description: "منصة توصيل طعام متكاملة مع تطبيق للعملاء والمطاعم وسائقي التوصيل. نظام ربحي قائم على العمولات.",
    price: 25000,
    monthlyRevenue: 5500,
    category: "تطبيقات التوصيل",
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "omar-salem",
      name: "عمر سالم الأحمد",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 4.5,
      totalSales: 8
    },
    technologies: ["Flutter", "Node.js", "MongoDB", "Socket.io", "Google Maps API"],
    features: [
      "تطبيق ثلاثي (عملاء، مطاعم، سائقين)",
      "تتبع الطلبات المباشر",
      "نظام دفع متعدد",
      "تقييمات وتعليقات",
      "إدارة العروض والخصومات",
      "تحليلات مبيعات متقدمة"
    ],
    demoUrl: "https://demo-fooddelivery.example.com",
    statistics: {
      visitors: 35600,
      conversionRate: 4.1,
      revenue: [4200, 4800, 5100, 5500, 5900, 6300]
    }
  },
  {
    id: 6,
    title: "منصة العمل الحر المختصة",
    description: "منصة ربط المستقلين مع أصحاب المشاريع في مجالات التقنية والتصميم. تحقق عوائد من العمولات والاشتراكات المميزة.",
    price: 20000,
    monthlyRevenue: 3800,
    category: "منصات العمل الحر",
    rating: 4.7,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "nora-abdullah",
      name: "نورا عبدالله",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 15
    },
    technologies: ["Next.js", "Express.js", "MySQL", "Stripe", "WebSocket"],
    features: [
      "ملفات شخصية احترافية",
      "نظام عروض تنافسي",
      "دفع آمن ومضمون",
      "تقييمات وتوصيات",
      "محادثات مباشرة",
      "إدارة المشاريع المتقدمة"
    ],
    demoUrl: "https://demo-freelance.example.com",
    statistics: {
      visitors: 18700,
      conversionRate: 3.9,
      revenue: [2800, 3200, 3500, 3800, 4100, 4400]
    }
  },
  {
    id: 7,
    title: "نظام إدارة المخازن الذكي",
    description: "حل متكامل لإدارة المخازن والمستودعات مع تتبع المخزون بالباركود ونظام إنذار مبكر للنفاد.",
    price: 16500,
    monthlyRevenue: 2200,
    category: "أنظمة إدارة",
    rating: 4.8,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "mohammed-alrashed",
      name: "محمد الراشد",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 19
    },
    technologies: ["Angular", "Spring Boot", "Oracle", "Redis", "Barcode Scanner"],
    features: [
      "تتبع المخزون بالباركود",
      "تقارير مخزونية مفصلة",
      "إنذارات نفاد المخزون",
      "إدارة الموردين",
      "تتبع تواريخ الانتهاء",
      "تكامل مع أنظمة المحاسبة"
    ],
    demoUrl: "https://demo-inventory.example.com",
    statistics: {
      visitors: 9200,
      conversionRate: 4.7,
      revenue: [1800, 2000, 2100, 2200, 2400, 2600]
    }
  },

  // حلول الشركات الجديدة
  {
    id: 11,
    title: "برنامج محاسبي للشركات",
    description: "نظام محاسبة شامل للشركات مع إدارة الحسابات والفواتير والتقارير المالية المتقدمة. يدعم المعايير المحاسبية الدولية ويحتوي على أدوات تحليل مالي احترافية.",
    price: 25000,
    monthlyRevenue: 3500,
    category: "أنظمة محاسبة",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "mohammed-ali-hassan",
      name: "محمد علي الحسن",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 31
    },
    technologies: ["Laravel", "Vue.js", "MySQL", "Redis", "Docker"],
    features: [
      "إدارة الحسابات المالية",
      "نظام الفواتير الإلكترونية",
      "تقارير مالية متقدمة",
      "إدارة المصروفات والإيرادات",
      "نظام الجرد والمخزون",
      "تكامل مع البنوك"
    ],
    demoUrl: "https://demo-accounting.example.com",
    statistics: {
      visitors: 12500,
      conversionRate: 6.2,
      revenue: [3200, 3400, 3500, 3600, 3700, 3800]
    }
  },

  {
    id: 12,
    title: "برنامج إداري لتنظيم الأعمال والمهام",
    description: "منصة إدارة مشاريع ومهام شاملة للشركات مع إدارة الفرق وتتبع الوقت ولوحات معلومات تفاعلية. يحسن الإنتاجية ويسهل التعاون بين الفرق.",
    price: 18000,
    monthlyRevenue: 2800,
    category: "أنظمة إدارة",
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "sarah-ahmed-almalki",
      name: "سارة أحمد المالكي",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 42
    },
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Docker"],
    features: [
      "إدارة المشاريع والمهام",
      "تتبع الوقت والإنتاجية",
      "لوحات معلومات تفاعلية",
      "إدارة الفرق والموظفين",
      "تقويم الأعمال المتقدم",
      "تقارير الأداء التفصيلية"
    ],
    demoUrl: "https://demo-taskmanager.example.com",
    statistics: {
      visitors: 15200,
      conversionRate: 5.8,
      revenue: [2600, 2700, 2800, 2900, 3000, 3100]
    }
  },

  {
    id: 13,
    title: "برنامج إدارة العقارات",
    description: "نظام إدارة عقارات متكامل للشركات العقارية مع إدارة الممتلكات والإيجارات والعملاء. يحتوي على خرائط تفاعلية وأدوات تسويق رقمية.",
    price: 22000,
    monthlyRevenue: 3200,
    category: "أنظمة إدارة",
    rating: 4.7,
    reviews: 73,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "khalid-mohammed-alotaibi",
      name: "خالد محمد العتيبي",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 28
    },
    technologies: ["Angular", "Spring Boot", "MongoDB", "Google Maps API", "AWS"],
    features: [
      "إدارة الممتلكات العقارية",
      "نظام الإيجارات والعقود",
      "خرائط تفاعلية للعقارات",
      "إدارة العملاء والمستأجرين",
      "تقارير مالية ومحاسبية",
      "تطبيق جوال للعملاء"
    ],
    demoUrl: "https://demo-realestate.example.com",
    statistics: {
      visitors: 11800,
      conversionRate: 5.5,
      revenue: [3000, 3100, 3200, 3300, 3400, 3500]
    }
  },

  {
    id: 14,
    title: "برنامج إدارة الموارد البشرية (HR)",
    description: "نظام موارد بشرية شامل يغطي جميع احتياجات الشركات من إدارة الموظفين والرواتب والحضور والغياب وتقييم الأداء والتدريب.",
    price: 28000,
    monthlyRevenue: 4200,
    category: "أنظمة إدارة",
    rating: 4.9,
    reviews: 94,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "fatima-abdullah-alqahtani",
      name: "فاطمة عبدالله القحطاني",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 37
    },
    technologies: ["Django", "React", "PostgreSQL", "Redis", "Celery"],
    features: [
      "إدارة بيانات الموظفين",
      "نظام الرواتب والبدلات",
      "تتبع الحضور والغياب",
      "تقييم أداء الموظفين",
      "إدارة الإجازات والطلبات",
      "تقارير الموارد البشرية"
    ],
    demoUrl: "https://demo-hr.example.com",
    statistics: {
      visitors: 13900,
      conversionRate: 6.8,
      revenue: [3800, 4000, 4200, 4400, 4600, 4800]
    }
  },

  {
    id: 15,
    title: "برنامج نقاط البيع (POS)",
    description: "نظام نقاط بيع متقدم للمتاجر والمطاعم مع إدارة المخزون والمبيعات والعملاء. يدعم أجهزة متعددة ويعمل أونلاين وأوفلاين.",
    price: 16000,
    monthlyRevenue: 2400,
    category: "متاجر إلكترونية",
    rating: 4.6,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "omar-saad-aldosari",
      name: "عمر سعد الدوسري",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 4.6,
      totalSales: 45
    },
    technologies: ["Flutter", "Node.js", "SQLite", "Stripe", "Firebase"],
    features: [
      "واجهة بيع سهلة الاستخدام",
      "إدارة المخزون المتقدمة",
      "تقارير المبيعات التفصيلية",
      "إدارة العملاء والولاء",
      "دعم أجهزة متعددة",
      "العمل أونلاين وأوفلاين"
    ],
    demoUrl: "https://demo-pos.example.com",
    statistics: {
      visitors: 16500,
      conversionRate: 4.9,
      revenue: [2200, 2300, 2400, 2500, 2600, 2700]
    }
  },

  {
    id: 16,
    title: "برنامج إدارة المخازن والمخزون",
    description: "نظام إدارة مخازن ومخزون شامل مع تتبع الباركود وإدارة الموردين وتقارير المخزون المتقدمة. يحسن كفاءة إدارة المخازن بنسبة 60%.",
    price: 20000,
    monthlyRevenue: 2900,
    category: "أنظمة إدارة",
    rating: 4.8,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "yasser-mohammed-alshehri",
      name: "ياسر محمد الشهري",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      totalSales: 33
    },
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Barcode Scanner"],
    features: [
      "تتبع المخزون بالباركود",
      "إدارة المخازن المتعددة",
      "تتبع تواريخ الانتهاء",
      "إدارة الموردين والطلبات",
      "تقارير المخزون المفصلة",
      "تكامل مع أنظمة المحاسبة"
    ],
    demoUrl: "https://demo-warehouse.example.com",
    statistics: {
      visitors: 10800,
      conversionRate: 5.2,
      revenue: [2700, 2800, 2900, 3000, 3100, 3200]
    }
  },

  {
    id: 17,
    title: "برنامج خدمة العملاء (CRM)",
    description: "نظام إدارة علاقات العملاء الشامل مع تتبع التفاعلات والمبيعات ودعم العملاء. يحتوي على أدوات تسويق متقدمة وتحليلات ذكية.",
    price: 24000,
    monthlyRevenue: 3600,
    category: "أنظمة إدارة",
    rating: 4.9,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    verified: true,
    profitable: true,
    seller: {
      id: "nora-abdulrahman-alasiri",
      name: "نورا عبدالرحمن العسيري",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      totalSales: 39
    },
    technologies: ["React", "Express.js", "MongoDB", "Socket.io", "Chart.js"],
    features: [
      "إدارة بيانات العملاء الشاملة",
      "تتبع التفاعلات والمبيعات",
      "نظام دعم العملاء المتقدم",
      "أدوات التسويق الرقمي",
      "تحليلات العملاء الذكية",
      "تقارير الأداء المفصلة"
    ],
    demoUrl: "https://demo-crm.example.com",
    statistics: {
      visitors: 14700,
      conversionRate: 6.1,
      revenue: [3400, 3500, 3600, 3700, 3800, 3900]
    }
  }
];

export const categories = [
  "جميع المشاريع",
  "تطبيقات الويب",
  "تطبيقات الجوال",
  "متاجر إلكترونية",
  "أنظمة إدارة",
  "أنظمة محاسبة",
  "منصات تعليمية",
  "أنظمة طبية",
  "تطبيقات التوصيل",
  "منصات العمل الحر",
  "حلول الذكاء الاصطناعي",
  "حلول الشركات"
];

export const technologies = [
  "React", "Next.js", "Vue.js", "Angular",
  "Node.js", "Express.js", "Laravel", "Django", "Spring Boot",
  "MongoDB", "MySQL", "PostgreSQL", "Redis",
  "TypeScript", "JavaScript", "Python", "PHP", "Java",
  "Flutter", "React Native", "Swift", "Kotlin",
  "AWS", "Google Cloud", "Docker", "Kubernetes"
];