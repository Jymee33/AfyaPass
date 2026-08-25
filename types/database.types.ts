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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          approved_at: string | null
          created_at: string
          denied_at: string | null
          expires_at: string | null
          facility_id: string
          id: string
          patient_id: string
          purpose: string
          requested_at: string
          requester_user_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          created_at?: string
          denied_at?: string | null
          expires_at?: string | null
          facility_id: string
          id?: string
          patient_id: string
          purpose: string
          requested_at?: string
          requester_user_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          created_at?: string
          denied_at?: string | null
          expires_at?: string | null
          facility_id?: string
          id?: string
          patient_id?: string
          purpose?: string
          requested_at?: string
          requester_user_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "access_requests_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_requests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "access_requests_requester_user_id_fkey"
            columns: ["requester_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      allergies: {
        Row: {
          created_at: string
          id: string
          patient_id: string
          reaction: string | null
          recorded_at: string
          recorded_by: string
          severity: string
          status: string
          substance: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          patient_id: string
          reaction?: string | null
          recorded_at?: string
          recorded_by: string
          severity?: string
          status?: string
          substance: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          patient_id?: string
          reaction?: string | null
          recorded_at?: string
          recorded_by?: string
          severity?: string
          status?: string
          substance?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "allergies_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "allergies_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: string
          actor_type: string
          actor_user_id: string
          facility_id: string | null
          id: string
          ip_address: unknown
          metadata: Json | null
          patient_id: string | null
          purpose: string | null
          resource_id: string | null
          resource_type: string
          timestamp: string
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_type: string
          actor_user_id: string
          facility_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          patient_id?: string | null
          purpose?: string | null
          resource_id?: string | null
          resource_type: string
          timestamp?: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_type?: string
          actor_user_id?: string
          facility_id?: string | null
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          patient_id?: string | null
          purpose?: string | null
          resource_id?: string | null
          resource_type?: string
          timestamp?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_events_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      care_plans: {
        Row: {
          author_user_id: string
          content: string
          created_at: string
          encounter_id: string | null
          end_date: string | null
          id: string
          patient_id: string
          start_date: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          author_user_id: string
          content: string
          created_at?: string
          encounter_id?: string | null
          end_date?: string | null
          id?: string
          patient_id: string
          start_date?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_user_id?: string
          content?: string
          created_at?: string
          encounter_id?: string | null
          end_date?: string | null
          id?: string
          patient_id?: string
          start_date?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "care_plans_author_user_id_fkey"
            columns: ["author_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "care_plans_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_notes: {
        Row: {
          author_user_id: string
          content: string
          created_at: string
          encounter_id: string
          id: string
          note_type: string
          patient_id: string
          updated_at: string
        }
        Insert: {
          author_user_id: string
          content: string
          created_at?: string
          encounter_id: string
          id?: string
          note_type?: string
          patient_id: string
          updated_at?: string
        }
        Update: {
          author_user_id?: string
          content?: string
          created_at?: string
          encounter_id?: string
          id?: string
          note_type?: string
          patient_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_notes_author_user_id_fkey"
            columns: ["author_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_notes_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_notes_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          captured_by: string | null
          consent_type: string
          created_at: string
          evidence_reference: string | null
          granted_at: string
          id: string
          patient_id: string
          status: string
          updated_at: string
          version: string
          withdrawn_at: string | null
        }
        Insert: {
          captured_by?: string | null
          consent_type?: string
          created_at?: string
          evidence_reference?: string | null
          granted_at?: string
          id?: string
          patient_id: string
          status?: string
          updated_at?: string
          version?: string
          withdrawn_at?: string | null
        }
        Update: {
          captured_by?: string | null
          consent_type?: string
          created_at?: string
          evidence_reference?: string | null
          granted_at?: string
          id?: string
          patient_id?: string
          status?: string
          updated_at?: string
          version?: string
          withdrawn_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consents_captured_by_fkey"
            columns: ["captured_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      counties: {
        Row: {
          code: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          code: string | null
          created_at: string
          facility_id: string
          id: string
          is_active: boolean
          name: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          facility_id: string
          id?: string
          is_active?: boolean
          name: string
        }
        Update: {
          code?: string | null
          created_at?: string
          facility_id?: string
          id?: string
          is_active?: boolean
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnoses: {
        Row: {
          code: string
          code_system: string
          created_at: string
          description: string
          diagnosis_type: string
          encounter_id: string
          id: string
          patient_id: string
          recorded_at: string
          recorded_by: string
          status: string
        }
        Insert: {
          code: string
          code_system?: string
          created_at?: string
          description: string
          diagnosis_type?: string
          encounter_id: string
          id?: string
          patient_id: string
          recorded_at?: string
          recorded_by: string
          status?: string
        }
        Update: {
          code?: string
          code_system?: string
          created_at?: string
          description?: string
          diagnosis_type?: string
          encounter_id?: string
          id?: string
          patient_id?: string
          recorded_at?: string
          recorded_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnoses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnoses_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      dispensing: {
        Row: {
          created_at: string
          dispensed_at: string
          facility_id: string
          id: string
          notes: string | null
          patient_id: string
          pharmacist_user_id: string
          prescription_id: string
          quantity_dispensed: number
          status: string
        }
        Insert: {
          created_at?: string
          dispensed_at?: string
          facility_id: string
          id?: string
          notes?: string | null
          patient_id: string
          pharmacist_user_id: string
          prescription_id: string
          quantity_dispensed: number
          status?: string
        }
        Update: {
          created_at?: string
          dispensed_at?: string
          facility_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          pharmacist_user_id?: string
          prescription_id?: string
          quantity_dispensed?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "dispensing_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensing_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensing_pharmacist_user_id_fkey"
            columns: ["pharmacist_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dispensing_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          encounter_id: string | null
          facility_id: string
          filename: string
          id: string
          mime_type: string
          patient_id: string
          size_bytes: number
          storage_key: string
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          document_type: string
          encounter_id?: string | null
          facility_id: string
          filename: string
          id?: string
          mime_type: string
          patient_id: string
          size_bytes: number
          storage_key: string
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          document_type?: string
          encounter_id?: string | null
          facility_id?: string
          filename?: string
          id?: string
          mime_type?: string
          patient_id?: string
          size_bytes?: number
          storage_key?: string
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      encounters: {
        Row: {
          created_at: string
          encounter_type: string
          ended_at: string | null
          facility_id: string
          id: string
          patient_id: string
          provider_user_id: string
          started_at: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          encounter_type: string
          ended_at?: string | null
          facility_id: string
          id?: string
          patient_id: string
          provider_user_id: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          encounter_type?: string
          ended_at?: string | null
          facility_id?: string
          id?: string
          patient_id?: string
          provider_user_id?: string
          started_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "encounters_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "encounters_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "encounters_provider_user_id_fkey"
            columns: ["provider_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      external_identifiers: {
        Row: {
          created_at: string
          id: string
          identifier: string
          identifier_type: string
          patient_id: string
          period_end: string | null
          period_start: string | null
          status: string
          system: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          identifier: string
          identifier_type: string
          patient_id: string
          period_end?: string | null
          period_start?: string | null
          status?: string
          system: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          identifier?: string
          identifier_type?: string
          patient_id?: string
          period_end?: string | null
          period_start?: string | null
          status?: string
          system?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_identifiers_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          county_id: string
          created_at: string
          facility_code: string
          facility_level: number | null
          facility_type: string
          id: string
          is_active: boolean
          name: string
          sub_county_id: string
          updated_at: string
        }
        Insert: {
          county_id: string
          created_at?: string
          facility_code: string
          facility_level?: number | null
          facility_type?: string
          id?: string
          is_active?: boolean
          name: string
          sub_county_id: string
          updated_at?: string
        }
        Update: {
          county_id?: string
          created_at?: string
          facility_code?: string
          facility_level?: number | null
          facility_type?: string
          id?: string
          is_active?: boolean
          name?: string
          sub_county_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "facilities_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facilities_sub_county_id_fkey"
            columns: ["sub_county_id"]
            isOneToOne: false
            referencedRelation: "sub_counties"
            referencedColumns: ["id"]
          },
        ]
      }
      facility_user_roles: {
        Row: {
          created_at: string
          department_id: string | null
          facility_id: string
          id: string
          role_id: string
          status: string
          updated_at: string
          user_profile_id: string
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          facility_id: string
          id?: string
          role_id: string
          status?: string
          updated_at?: string
          user_profile_id: string
          valid_from?: string
          valid_to?: string | null
        }
        Update: {
          created_at?: string
          department_id?: string | null
          facility_id?: string
          id?: string
          role_id?: string
          status?: string
          updated_at?: string
          user_profile_id?: string
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_user_roles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_user_roles_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "facility_user_roles_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      healthcare_workers: {
        Row: {
          created_at: string
          id: string
          professional_identifier: string | null
          professional_type: string
          status: string
          updated_at: string
          user_profile_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          professional_identifier?: string | null
          professional_type: string
          status?: string
          updated_at?: string
          user_profile_id: string
        }
        Update: {
          created_at?: string
          id?: string
          professional_identifier?: string | null
          professional_type?: string
          status?: string
          updated_at?: string
          user_profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "healthcare_workers_user_profile_id_fkey"
            columns: ["user_profile_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_order_items: {
        Row: {
          created_at: string
          id: string
          lab_order_id: string
          status: string
          test_code: string
          test_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          lab_order_id: string
          status?: string
          test_code: string
          test_name: string
        }
        Update: {
          created_at?: string
          id?: string
          lab_order_id?: string
          status?: string
          test_code?: string
          test_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_order_items_lab_order_id_fkey"
            columns: ["lab_order_id"]
            isOneToOne: false
            referencedRelation: "lab_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_orders: {
        Row: {
          clinical_history: string | null
          created_at: string
          encounter_id: string
          facility_id: string
          id: string
          order_date: string
          ordering_user_id: string
          patient_id: string
          status: string
          updated_at: string
        }
        Insert: {
          clinical_history?: string | null
          created_at?: string
          encounter_id: string
          facility_id: string
          id?: string
          order_date?: string
          ordering_user_id: string
          patient_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          clinical_history?: string | null
          created_at?: string
          encounter_id?: string
          facility_id?: string
          id?: string
          order_date?: string
          ordering_user_id?: string
          patient_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_orders_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_ordering_user_id_fkey"
            columns: ["ordering_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_orders_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_results: {
        Row: {
          created_at: string
          id: string
          is_abnormal: boolean
          lab_order_item_id: string
          numeric_value: number | null
          patient_id: string
          performed_at: string
          performing_user_id: string
          reference_range: string | null
          result_status: string
          result_value: string
          unit: string | null
          updated_at: string
          verified_at: string | null
          verifying_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_abnormal?: boolean
          lab_order_item_id: string
          numeric_value?: number | null
          patient_id: string
          performed_at?: string
          performing_user_id: string
          reference_range?: string | null
          result_status?: string
          result_value: string
          unit?: string | null
          updated_at?: string
          verified_at?: string | null
          verifying_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_abnormal?: boolean
          lab_order_item_id?: string
          numeric_value?: number | null
          patient_id?: string
          performed_at?: string
          performing_user_id?: string
          reference_range?: string | null
          result_status?: string
          result_value?: string
          unit?: string | null
          updated_at?: string
          verified_at?: string | null
          verifying_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_results_lab_order_item_id_fkey"
            columns: ["lab_order_item_id"]
            isOneToOne: false
            referencedRelation: "lab_order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_performing_user_id_fkey"
            columns: ["performing_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_results_verifying_user_id_fkey"
            columns: ["verifying_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          code: string | null
          code_system: string | null
          created_at: string
          dosage_form: string | null
          generic_name: string
          id: string
          name: string
          status: string
          strength: string | null
          updated_at: string
        }
        Insert: {
          code?: string | null
          code_system?: string | null
          created_at?: string
          dosage_form?: string | null
          generic_name: string
          id?: string
          name: string
          status?: string
          strength?: string | null
          updated_at?: string
        }
        Update: {
          code?: string | null
          code_system?: string | null
          created_at?: string
          dosage_form?: string | null
          generic_name?: string
          id?: string
          name?: string
          status?: string
          strength?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      observations: {
        Row: {
          created_at: string
          encounter_id: string
          id: string
          observation_type: string
          patient_id: string
          recorded_at: string
          recorded_by: string
          unit: string
          value: number
        }
        Insert: {
          created_at?: string
          encounter_id: string
          id?: string
          observation_type: string
          patient_id: string
          recorded_at?: string
          recorded_by: string
          unit: string
          value: number
        }
        Update: {
          created_at?: string
          encounter_id?: string
          id?: string
          observation_type?: string
          patient_id?: string
          recorded_at?: string
          recorded_by?: string
          unit?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "observations_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "observations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "observations_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_addresses: {
        Row: {
          address_text: string | null
          address_type: string
          county_id: string | null
          created_at: string
          id: string
          is_current: boolean
          patient_id: string
          sub_county_id: string | null
          updated_at: string
          valid_from: string | null
          valid_to: string | null
          ward_location: string | null
        }
        Insert: {
          address_text?: string | null
          address_type?: string
          county_id?: string | null
          created_at?: string
          id?: string
          is_current?: boolean
          patient_id: string
          sub_county_id?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          ward_location?: string | null
        }
        Update: {
          address_text?: string | null
          address_type?: string
          county_id?: string | null
          created_at?: string
          id?: string
          is_current?: boolean
          patient_id?: string
          sub_county_id?: string | null
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
          ward_location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_addresses_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_addresses_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_addresses_sub_county_id_fkey"
            columns: ["sub_county_id"]
            isOneToOne: false
            referencedRelation: "sub_counties"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_cards: {
        Row: {
          card_number: string
          created_at: string
          id: string
          issued_at: string
          patient_id: string
          revoked_at: string | null
          status: string
        }
        Insert: {
          card_number: string
          created_at?: string
          id?: string
          issued_at?: string
          patient_id: string
          revoked_at?: string | null
          status?: string
        }
        Update: {
          card_number?: string
          created_at?: string
          id?: string
          issued_at?: string
          patient_id?: string
          revoked_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "patient_cards_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_contacts: {
        Row: {
          contact_type: string
          created_at: string
          email_encrypted: string | null
          id: string
          is_primary: boolean
          patient_id: string
          phone_encrypted: string | null
          updated_at: string
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          contact_type: string
          created_at?: string
          email_encrypted?: string | null
          id?: string
          is_primary?: boolean
          patient_id: string
          phone_encrypted?: string | null
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          contact_type?: string
          created_at?: string
          email_encrypted?: string | null
          id?: string
          is_primary?: boolean
          patient_id?: string
          phone_encrypted?: string | null
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_contacts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_identifiers: {
        Row: {
          created_at: string
          id: string
          identifier_hash: string
          identifier_type: string
          identifier_value_encrypted: string
          patient_id: string
          updated_at: string
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          identifier_hash: string
          identifier_type: string
          identifier_value_encrypted: string
          patient_id: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          identifier_hash?: string
          identifier_type?: string
          identifier_value_encrypted?: string
          patient_id?: string
          updated_at?: string
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_identifiers_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_relationships: {
        Row: {
          created_at: string
          id: string
          patient_id: string
          related_patient_id: string
          relationship_type: string
          status: string
          updated_at: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          patient_id: string
          related_patient_id: string
          relationship_type: string
          status?: string
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          patient_id?: string
          related_patient_id?: string
          relationship_type?: string
          status?: string
          updated_at?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_relationships_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "patient_relationships_related_patient_id_fkey"
            columns: ["related_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          created_at: string
          date_of_birth: string
          first_name: string
          id: string
          last_name: string
          middle_name: string | null
          patient_number: string
          sex: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_of_birth: string
          first_name: string
          id?: string
          last_name: string
          middle_name?: string | null
          patient_number: string
          sex: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_of_birth?: string
          first_name?: string
          id?: string
          last_name?: string
          middle_name?: string | null
          patient_number?: string
          sex?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      prescriptions: {
        Row: {
          created_at: string
          dose: string
          duration: string
          encounter_id: string
          frequency: string
          id: string
          instructions: string | null
          medication_id: string
          patient_id: string
          prescribed_at: string
          prescriber_user_id: string
          quantity: number
          route: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dose: string
          duration: string
          encounter_id: string
          frequency: string
          id?: string
          instructions?: string | null
          medication_id: string
          patient_id: string
          prescribed_at?: string
          prescriber_user_id: string
          quantity: number
          route?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dose?: string
          duration?: string
          encounter_id?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medication_id?: string
          patient_id?: string
          prescribed_at?: string
          prescriber_user_id?: string
          quantity?: number
          route?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_prescriber_user_id_fkey"
            columns: ["prescriber_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      procedures: {
        Row: {
          code: string | null
          code_system: string | null
          created_at: string
          description: string
          encounter_id: string
          id: string
          patient_id: string
          performed_at: string
          performed_by: string
          status: string
        }
        Insert: {
          code?: string | null
          code_system?: string | null
          created_at?: string
          description: string
          encounter_id: string
          id?: string
          patient_id: string
          performed_at?: string
          performed_by: string
          status?: string
        }
        Update: {
          code?: string | null
          code_system?: string | null
          created_at?: string
          description?: string
          encounter_id?: string
          id?: string
          patient_id?: string
          performed_at?: string
          performed_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedures_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedures_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedures_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      provenance: {
        Row: {
          action: string
          actor_user_id: string
          created_at: string
          facility_id: string
          id: string
          metadata: Json | null
          patient_id: string
          recorded_at: string
          resource_id: string
          resource_type: string
          source_system: string
        }
        Insert: {
          action: string
          actor_user_id: string
          created_at?: string
          facility_id: string
          id?: string
          metadata?: Json | null
          patient_id: string
          recorded_at?: string
          resource_id: string
          resource_type: string
          source_system?: string
        }
        Update: {
          action?: string
          actor_user_id?: string
          created_at?: string
          facility_id?: string
          id?: string
          metadata?: Json | null
          patient_id?: string
          recorded_at?: string
          resource_id?: string
          resource_type?: string
          source_system?: string
        }
        Relationships: [
          {
            foreignKeyName: "provenance_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provenance_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provenance_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      qr_tokens: {
        Row: {
          card_id: string
          created_at: string
          expires_at: string | null
          id: string
          issued_at: string
          last_used_at: string | null
          revoked_at: string | null
          status: string
          token_hash: string
        }
        Insert: {
          card_id: string
          created_at?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          last_used_at?: string | null
          revoked_at?: string | null
          status?: string
          token_hash: string
        }
        Update: {
          card_id?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          issued_at?: string
          last_used_at?: string | null
          revoked_at?: string | null
          status?: string
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_tokens_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "patient_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_events: {
        Row: {
          actor_user_id: string
          created_at: string
          event_type: string
          id: string
          notes: string | null
          referral_id: string
        }
        Insert: {
          actor_user_id: string
          created_at?: string
          event_type: string
          id?: string
          notes?: string | null
          referral_id: string
        }
        Update: {
          actor_user_id?: string
          created_at?: string
          event_type?: string
          id?: string
          notes?: string | null
          referral_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_events_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referral_events_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          destination_facility_id: string
          encounter_id: string
          id: string
          originating_facility_id: string
          patient_id: string
          reason: string
          referring_user_id: string
          status: string
          updated_at: string
          urgency: string
        }
        Insert: {
          created_at?: string
          destination_facility_id: string
          encounter_id: string
          id?: string
          originating_facility_id: string
          patient_id: string
          reason: string
          referring_user_id: string
          status?: string
          updated_at?: string
          urgency?: string
        }
        Update: {
          created_at?: string
          destination_facility_id?: string
          encounter_id?: string
          id?: string
          originating_facility_id?: string
          patient_id?: string
          reason?: string
          referring_user_id?: string
          status?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_destination_facility_id_fkey"
            columns: ["destination_facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_encounter_id_fkey"
            columns: ["encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_originating_facility_id_fkey"
            columns: ["originating_facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referring_user_id_fkey"
            columns: ["referring_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      security_events: {
        Row: {
          actor_user_id: string | null
          details: string
          event_type: string
          id: string
          ip_address: unknown
          severity: string
          timestamp: string
        }
        Insert: {
          actor_user_id?: string | null
          details: string
          event_type: string
          id?: string
          ip_address?: unknown
          severity?: string
          timestamp?: string
        }
        Update: {
          actor_user_id?: string | null
          details?: string
          event_type?: string
          id?: string
          ip_address?: unknown
          severity?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "security_events_actor_user_id_fkey"
            columns: ["actor_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_counties: {
        Row: {
          county_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          county_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          county_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_counties_county_id_fkey"
            columns: ["county_id"]
            isOneToOne: false
            referencedRelation: "counties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
