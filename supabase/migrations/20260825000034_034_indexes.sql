-- Migration 034: Intentional Database Indexes

-- Identity Indexes
CREATE INDEX idx_patients_patient_number ON patients(patient_number);
CREATE INDEX idx_patient_identifiers_patient_id ON patient_identifiers(patient_id);
CREATE INDEX idx_patient_identifiers_hash ON patient_identifiers(identifier_hash);
CREATE INDEX idx_patient_contacts_patient_id ON patient_contacts(patient_id);

-- Organization Indexes
CREATE INDEX idx_sub_counties_county_id ON sub_counties(county_id);
CREATE INDEX idx_facilities_county_id ON facilities(county_id);
CREATE INDEX idx_facilities_sub_county_id ON facilities(sub_county_id);
CREATE INDEX idx_facilities_mfl_code ON facilities(facility_code);

-- User & Staff Indexes
CREATE INDEX idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX idx_facility_user_roles_user_profile ON facility_user_roles(user_profile_id);
CREATE INDEX idx_facility_user_roles_facility ON facility_user_roles(facility_id);

-- Credentials & Token Indexes
CREATE INDEX idx_patient_cards_patient_id ON patient_cards(patient_id);
CREATE INDEX idx_qr_tokens_card_id ON qr_tokens(card_id);
CREATE INDEX idx_qr_tokens_hash ON qr_tokens(token_hash);

-- Clinical Indexes
CREATE INDEX idx_encounters_patient_id ON encounters(patient_id);
CREATE INDEX idx_encounters_facility_id ON encounters(facility_id);
CREATE INDEX idx_encounters_provider ON encounters(provider_user_id);
CREATE INDEX idx_encounters_started_at ON encounters(started_at DESC);

CREATE INDEX idx_observations_encounter ON observations(encounter_id);
CREATE INDEX idx_diagnoses_patient ON diagnoses(patient_id);
CREATE INDEX idx_diagnoses_encounter ON diagnoses(encounter_id);
CREATE INDEX idx_clinical_notes_encounter ON clinical_notes(encounter_id);
CREATE INDEX idx_allergies_patient ON allergies(patient_id);

CREATE INDEX idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_encounter ON prescriptions(encounter_id);
CREATE INDEX idx_dispensing_prescription ON dispensing(prescription_id);

CREATE INDEX idx_lab_orders_patient ON lab_orders(patient_id);
CREATE INDEX idx_lab_orders_encounter ON lab_orders(encounter_id);
CREATE INDEX idx_lab_results_item ON lab_results(lab_order_item_id);

CREATE INDEX idx_referrals_patient ON referrals(patient_id);
CREATE INDEX idx_referrals_dest_facility ON referrals(destination_facility_id);

-- Audit Indexes
CREATE INDEX idx_audit_events_patient ON audit_events(patient_id);
CREATE INDEX idx_audit_events_actor ON audit_events(actor_user_id);
CREATE INDEX idx_audit_events_timestamp ON audit_events(timestamp DESC);
