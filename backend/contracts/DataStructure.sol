// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataStructure {
    enum Gender {
        Male,
        Female
    }

    enum MedicalSpeciality {
        Anesthesia,
        Cardiovascular,
        CommunityHealth,
        Dentistry,
        Dermatology,
        DietNutrition,
        Emergency,
        Endocrine,
        Gastroenterologic,
        Genetic,
        Geriatric,
        Gynecologic,
        Hematologic,
        Infectious,
        LaboratoryScience,
        Midwifery,
        Musculoskeletal,
        Neurologic,
        Nursing,
        Obstetric,
        Oncologic,
        Optometric,
        Otolaryngologic,
        Pathology,
        Pediatric,
        PharmacySpecialty,
        Physiotherapy,
        PlasticSurgery,
        Podiatric,
        PrimaryCare,
        Psychiatric,
        PublicHealth,
        Pulmonary,
        Radiography,
        Renal,
        RespiratoryTherapy,
        Rheumatologic,
        SpeechPathology,
        Surgical,
        Toxicologic,
        Urologic
    }

    struct Media {
        string description;
        string cid;
    }

    struct Admin {
        string firstName;
        string lastName;
        string phoneNumber;
        string email;
        string rAddress; //residential address
    }

    struct Hospital {
        string name;
        string location; //address
        string phoneNumber;
    }

    struct Doctor {
        string firstName;
        string lastName;
        string email;
        string rAddress;
        MedicalSpeciality speciality;
        Hospital[] workplace;
    }
}
