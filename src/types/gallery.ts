
export interface Painting {
  id: string;
  owner_id: string;
  
  // Public multilingual fields
  title_en: string;
  title_fr: string;
  title_ru: string;
  
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  
  year?: number;
  
  description_en?: string;
  description_fr?: string;
  description_ru?: string;
  
  public_image_url?: string;
  
  // Private multilingual fields
  technical_analysis_en?: string;
  technical_analysis_fr?: string;
  technical_analysis_ru?: string;
  
  expertise_report_en?: string;
  expertise_report_fr?: string;
  expertise_report_ru?: string;
  
  certificates: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  
  documents: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  
  created_at: string;
  updated_at: string;
  is_published: boolean;
}

export interface AccessToken {
  id: string;
  painting_id: string;
  owner_id: string;
  token: string;
  expires_at: string;
  created_at: string;
  used_at?: string;
  usage_count: number;
  max_usage?: number;
  is_active: boolean;
  template_type: '1hour' | '24hours' | '7days';
}

export interface AccessLog {
  id: string;
  painting_id: string;
  token_id?: string;
  accessed_at: string;
  ip_address?: string;
  user_agent?: string;
  success: boolean;
  country?: string;
  city?: string;
  device_fingerprint?: string;
  error_message?: string;
  error_type?: string;
}

export type Language = 'en' | 'fr' | 'ru';

export interface PaintingFormData {
  title_en: string;
  title_fr: string;
  title_ru: string;
  artist_en: string;
  artist_fr: string;
  artist_ru: string;
  year?: number;
  description_en?: string;
  description_fr?: string;
  description_ru?: string;
  public_image_url?: string;
  technical_analysis_en?: string;
  technical_analysis_fr?: string;
  technical_analysis_ru?: string;
  expertise_report_en?: string;
  expertise_report_fr?: string;
  expertise_report_ru?: string;
  is_published: boolean;
}
