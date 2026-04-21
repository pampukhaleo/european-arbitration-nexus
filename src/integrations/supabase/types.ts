export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      access_logs: {
        Row: {
          accessed_at: string
          city: string | null
          country: string | null
          device_fingerprint: string | null
          error_message: string | null
          error_type: string | null
          id: string
          ip_address: string | null
          painting_id: string
          success: boolean
          token_id: string | null
          user_agent: string | null
        }
        Insert: {
          accessed_at?: string
          city?: string | null
          country?: string | null
          device_fingerprint?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: string
          ip_address?: string | null
          painting_id: string
          success?: boolean
          token_id?: string | null
          user_agent?: string | null
        }
        Update: {
          accessed_at?: string
          city?: string | null
          country?: string | null
          device_fingerprint?: string | null
          error_message?: string | null
          error_type?: string | null
          id?: string
          ip_address?: string | null
          painting_id?: string
          success?: boolean
          token_id?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_logs_painting_id_fkey"
            columns: ["painting_id"]
            isOneToOne: false
            referencedRelation: "paintings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_logs_token_id_fkey"
            columns: ["token_id"]
            isOneToOne: false
            referencedRelation: "access_tokens"
            referencedColumns: ["id"]
          },
        ]
      }
      access_tokens: {
        Row: {
          created_at: string
          created_ip: string | null
          expires_at: string
          id: string
          is_active: boolean | null
          max_usage: number | null
          owner_id: string
          painting_id: string
          template_type: string
          token: string
          usage_count: number | null
          used_at: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          created_ip?: string | null
          expires_at: string
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
          owner_id: string
          painting_id: string
          template_type: string
          token: string
          usage_count?: number | null
          used_at?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          created_ip?: string | null
          expires_at?: string
          id?: string
          is_active?: boolean | null
          max_usage?: number | null
          owner_id?: string
          painting_id?: string
          template_type?: string
          token?: string
          usage_count?: number | null
          used_at?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "access_tokens_painting_id_fkey"
            columns: ["painting_id"]
            isOneToOne: false
            referencedRelation: "paintings"
            referencedColumns: ["id"]
          },
        ]
      }
      guilds: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      invite_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          guild_id: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          guild_id: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          guild_id?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "invite_codes_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
        ]
      }
      painting_owners: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string
          painting_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id: string
          painting_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string
          painting_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "painting_owners_painting_id_fkey"
            columns: ["painting_id"]
            isOneToOne: false
            referencedRelation: "paintings"
            referencedColumns: ["id"]
          },
        ]
      }
      painting_private: {
        Row: {
          created_at: string
          eac_inventory_no: string | null
          eac_issue_date: string | null
          eac_passport_no: string | null
          painting_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          eac_inventory_no?: string | null
          eac_issue_date?: string | null
          eac_passport_no?: string | null
          painting_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          eac_inventory_no?: string | null
          eac_issue_date?: string | null
          eac_passport_no?: string | null
          painting_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "painting_private_painting_id_fkey"
            columns: ["painting_id"]
            isOneToOne: true
            referencedRelation: "paintings"
            referencedColumns: ["id"]
          },
        ]
      }
      paintings: {
        Row: {
          acquisition_credit_en: string | null
          acquisition_credit_fr: string | null
          acquisition_credit_ru: string | null
          artist_dates: string | null
          artist_en: string
          artist_fr: string
          artist_ru: string
          certificates: Json | null
          created_at: string
          date_place_made_en: string | null
          date_place_made_fr: string | null
          date_place_made_ru: string | null
          description_en: string | null
          description_fr: string | null
          description_ru: string | null
          dimensions: string | null
          documents: Json | null
          expertise_report_en: string | null
          expertise_report_fr: string | null
          expertise_report_ru: string | null
          frame_en: string | null
          frame_fr: string | null
          frame_ru: string | null
          full_title_en: string | null
          full_title_fr: string | null
          full_title_ru: string | null
          genre_en: string | null
          genre_fr: string | null
          genre_ru: string | null
          id: string
          is_published: boolean | null
          materials_en: string | null
          materials_fr: string | null
          materials_ru: string | null
          original_title: string | null
          owner_id: string
          public_image_url: string | null
          technical_analysis_en: string | null
          technical_analysis_fr: string | null
          technical_analysis_ru: string | null
          title_en: string
          title_fr: string
          title_ru: string
          updated_at: string
          year: number | null
        }
        Insert: {
          acquisition_credit_en?: string | null
          acquisition_credit_fr?: string | null
          acquisition_credit_ru?: string | null
          artist_dates?: string | null
          artist_en: string
          artist_fr: string
          artist_ru: string
          certificates?: Json | null
          created_at?: string
          date_place_made_en?: string | null
          date_place_made_fr?: string | null
          date_place_made_ru?: string | null
          description_en?: string | null
          description_fr?: string | null
          description_ru?: string | null
          dimensions?: string | null
          documents?: Json | null
          expertise_report_en?: string | null
          expertise_report_fr?: string | null
          expertise_report_ru?: string | null
          frame_en?: string | null
          frame_fr?: string | null
          frame_ru?: string | null
          full_title_en?: string | null
          full_title_fr?: string | null
          full_title_ru?: string | null
          genre_en?: string | null
          genre_fr?: string | null
          genre_ru?: string | null
          id?: string
          is_published?: boolean | null
          materials_en?: string | null
          materials_fr?: string | null
          materials_ru?: string | null
          original_title?: string | null
          owner_id: string
          public_image_url?: string | null
          technical_analysis_en?: string | null
          technical_analysis_fr?: string | null
          technical_analysis_ru?: string | null
          title_en: string
          title_fr: string
          title_ru: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          acquisition_credit_en?: string | null
          acquisition_credit_fr?: string | null
          acquisition_credit_ru?: string | null
          artist_dates?: string | null
          artist_en?: string
          artist_fr?: string
          artist_ru?: string
          certificates?: Json | null
          created_at?: string
          date_place_made_en?: string | null
          date_place_made_fr?: string | null
          date_place_made_ru?: string | null
          description_en?: string | null
          description_fr?: string | null
          description_ru?: string | null
          dimensions?: string | null
          documents?: Json | null
          expertise_report_en?: string | null
          expertise_report_fr?: string | null
          expertise_report_ru?: string | null
          frame_en?: string | null
          frame_fr?: string | null
          frame_ru?: string | null
          full_title_en?: string | null
          full_title_fr?: string | null
          full_title_ru?: string | null
          genre_en?: string | null
          genre_fr?: string | null
          genre_ru?: string | null
          id?: string
          is_published?: boolean | null
          materials_en?: string | null
          materials_fr?: string | null
          materials_ru?: string | null
          original_title?: string | null
          owner_id?: string
          public_image_url?: string | null
          technical_analysis_en?: string | null
          technical_analysis_fr?: string | null
          technical_analysis_ru?: string | null
          title_en?: string
          title_fr?: string
          title_ru?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_date: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_date?: string
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_date?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          has_paid: boolean | null
          id: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          has_paid?: boolean | null
          id: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          has_paid?: boolean | null
          id?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          dkp_balance: number
          dkp_pending: number
          guild_id: string | null
          id: string
          is_approved: boolean | null
          name: string | null
          roles: string[] | null
          share_permission: boolean | null
        }
        Insert: {
          created_at?: string
          dkp_balance?: number
          dkp_pending?: number
          guild_id?: string | null
          id: string
          is_approved?: boolean | null
          name?: string | null
          roles?: string[] | null
          share_permission?: boolean | null
        }
        Update: {
          created_at?: string
          dkp_balance?: number
          dkp_pending?: number
          guild_id?: string | null
          id?: string
          is_approved?: boolean | null
          name?: string | null
          roles?: string[] | null
          share_permission?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_tokens: { Args: never; Returns: number }
      current_user_is_admin: { Args: never; Returns: boolean }
      generate_access_token: {
        Args: {
          owner_id_param: string
          painting_id_param: string
          template_type_param: string
        }
        Returns: {
          expires_at: string
          token: string
        }[]
      }
      get_private_painting_info:
        | {
            Args: { access_token_str: string; painting_uuid: string }
            Returns: {
              eac_inventory_no: string
              eac_issue_date: string
              eac_passport_no: string
            }[]
          }
        | {
            Args: { painting_id_param: string; token_text: string }
            Returns: {
              eac_inventory_no: string
              eac_issue_date: string
              eac_passport_no: string
            }[]
          }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      validate_access_token: {
        Args: { painting_id_param: string; token_text: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "owner" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "owner", "user"],
    },
  },
} as const
