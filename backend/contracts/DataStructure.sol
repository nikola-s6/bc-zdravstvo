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

    // media is stored in web3.storage ipfs
    // cid (content indetifier) is used to access media stored on ipfs
    // one media (or cid) is used to store multiple photos or videos associated with doctors report
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
        bool exists; //used to determine whether struct exists in a mapping
    }

    struct Doctor {
        string firstName;
        string lastName;
        string phoneNumber;
        string email;
        string rAddress;
        Gender gender;
        MedicalSpeciality speciality;
        bool exists;
    }

    struct MedicalData {
        string hospital;
        address doctor;
        address patient;
        string diagnosis;
        string treatment;
        string medication;
        uint256 date;
        Media media;
    }

    struct Patient {
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
        string rAddress;
        Gender gender;
        MedicalData[] reports;
        bool exists;
    }
}
