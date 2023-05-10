// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorization.sol";

// By inheriting Authorization this contract is also inheriting DataStructure
contract HealthRecords is Authorization {
    mapping(address => Patient) private patients;

    // gender is sent as uint8
    function createPatient(
        address _patientAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _rAddress,
        Gender _gender
    ) external ownerAndAdmin returns (Patient memory) {
        Patient storage patient = patients[_patientAddress];

        patient.firstName = _firstName;
        patient.lastName = _lastName;
        patient.email = _email;
        patient.phoneNumber = _phoneNumber;
        patient.rAddress = _rAddress;
        patient.gender = _gender;
        patient.exists = true;

        return patient;
    }

    function getPatient(
        address _patientAddress
    )
        public
        view
        ownerAdminDoctorPatient(_patientAddress)
        returns (Patient memory)
    {
        return patients[_patientAddress];
    }

    function addMedicalData(
        string memory _hospital,
        address _patient,
        address _doctor,
        string memory _treatment,
        string memory _diagnosis,
        string memory _medication,
        uint256 _date,
        string memory _description,
        string memory _cid
    ) public onlyDoctor returns (MedicalData memory) {
        Media memory _media = Media({description: _description, cid: _cid});
        MedicalData memory medicalData;
        medicalData.hospital = _hospital;
        medicalData.patient = _patient;
        medicalData.doctor = _doctor;
        medicalData.treatment = _treatment;
        medicalData.diagnosis = _diagnosis;
        medicalData.medication = _medication;
        medicalData.date = _date;
        medicalData.media = _media;

        patients[_patient].reports.push(medicalData);
        return medicalData;
    }

    function getPatientsMedicalData(
        address _patientAddress
    )
        public
        view
        ownerAdminDoctorPatient(_patientAddress)
        returns (MedicalData[] memory)
    {
        return getPatient(_patientAddress).reports;
    }
}
