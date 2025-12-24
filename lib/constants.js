// Storage URLs
export const STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'https://hmgdlcwzpmbgvfpaiylz.supabase.co/storage/v1/object/public/images'

export const URL_ANIM = `${STORAGE_BASE_URL}/animasi/`
export const URL_ICON = `${STORAGE_BASE_URL}/icons/`
export const URL_IMAGE = `${STORAGE_BASE_URL}/images/`
export const URL_SOUND = `${STORAGE_BASE_URL}/sounds/`

// Available 3D Models
export const MODELS_3D = {
  KUBUS: {
    name: 'Kubus',
    model: 'kubus-64.glb',
    arUrl: 'https://mywebar.com/p/objek1volumekubus',
    scale: 0.7
  },
  BALOK_JARING_1: {
    name: 'Jaring-jaring Balok 1',
    model: 'animasi-jaring-balok-1.glb',
    arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
    scale: 1
  },
  BALOK_JARING_2: {
    name: 'Jaring-jaring Balok 2',
    model: 'animasi-jaring-balok-2.glb',
    arUrl: 'https://mywebar.com/p/objek7jaringjaringbalok',
    scale: 1
  }
}

// Sample Materi Data
export const SAMPLE_MATERI = [
  {
    id: 'kubus',
    title: 'Volume Kubus',
    description: 'Mempelajari cara menghitung volume kubus',
    model: MODELS_3D.KUBUS,
    order: 1
  },
  {
    id: 'balok',
    title: 'Luas Permukaan Balok',
    description: 'Mempelajari luas permukaan dan jaring-jaring balok',
    model: MODELS_3D.BALOK_JARING_1,
    order: 2
  }
]

// User Roles
export const ROLES = {
  GURU: 'guru',
  SISWA: 'siswa'
}
