import {
  BadgeCheck,
  Blocks,
  Building2,
  DraftingCompass,
  Gem,
  Handshake,
  Home,
  Landmark,
  Layers3,
  Leaf,
  Lightbulb,
  Map,
  Mountain,
  PenTool,
  Ruler,
  ShieldCheck,
  Sparkles,
  Timer,
} from 'lucide-react'

export const services = [
  {
    title: 'Architecture',
    copy: 'Refined residential and commercial architecture with a focus on proportion, light, and long-term usability.',
    icon: Building2,
  },
  {
    title: 'Interior Design',
    copy: 'Warm, composed interiors where materials, furniture, lighting, and circulation feel deliberately resolved.',
    icon: Home,
  },
  {
    title: 'Town Planning',
    copy: 'Clear master planning for communities, layouts, and civic-scale developments with practical execution paths.',
    icon: Map,
  },
  {
    title: 'Landscape Design',
    copy: 'Outdoor environments shaped for privacy, arrival, shade, water, and daily living.',
    icon: Leaf,
  },
  {
    title: '3D Visualization',
    copy: 'Photoreal views and spatial walkthroughs that help clients see decisions before construction begins.',
    icon: Blocks,
  },
  {
    title: 'Construction Consultation',
    copy: 'Site guidance, detailing support, and quality checks that keep design intent aligned with delivery.',
    icon: Ruler,
  },
]

export const projects = [
  {
    title: 'Aurum Courtyard Residence',
    location: 'Akola, Maharashtra',
    category: 'Luxury Residence',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Linea Commercial House',
    location: 'Washim Road, Akola',
    category: 'Commercial Architecture',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  {
    title: 'Serein Interior Suite',
    location: 'Maharashtra',
    category: 'Interior Design',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
  },
]

export const reasons = [
  ['Creative Design', Sparkles],
  ['Functional Planning', DraftingCompass],
  ['Quality Execution', BadgeCheck],
  ['Transparent Process', Handshake],
  ['Client Satisfaction', Gem],
  ['Modern Technology', Layers3],
  ['Sustainable Design', Leaf],
  ['Timely Delivery', Timer],
]

export const process = [
  'Consultation',
  'Planning',
  'Concept Design',
  '3D Visualization',
  'Execution',
  'Project Handover',
]

export const testimonials = [
  {
    name: 'A. Deshmukh',
    role: 'Residence Client',
    quote:
      'The team translated our brief into a home that feels calm, practical, and genuinely premium. Every meeting was clear and professional.',
  },
  {
    name: 'R. Khan',
    role: 'Commercial Client',
    quote:
      'SH Architects brought structure to a complex commercial requirement and helped us make confident design decisions quickly.',
  },
  {
    name: 'M. Jain',
    role: 'Interior Client',
    quote:
      'Their material sense and attention to detail changed the entire character of our interiors without losing comfort.',
  },
]

export const stats = [
  ['12+', 'Years of focused practice'],
  ['175+', 'Projects planned and designed'],
  ['4.9', 'Google rating from clients'],
]

export const trustIcons = [ShieldCheck, Landmark, Mountain, PenTool]
