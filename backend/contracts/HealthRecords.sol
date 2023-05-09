// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Authorization.sol";

// By inheriting Authorization this contract is also inheriting DataStructure
contract HealthRecords is Authorization {
    mapping(address => Patient) private patients;

    // gender is sent as uint8
    function createPatient(
        address _address,
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _phoneNumber,
        string memory _rAddress,
        Gender _gender
    ) external ownerAndAdmin returns (Patient memory) {
        Patient storage patient = patients[_address];

        patient.firstName = _firstName;
        patient.lastName = _lastName;
        patient.email = _email;
        patient.phoneNumber = _phoneNumber;
        patient.rAddress = _rAddress;
        patient.gender = _gender;

        return patient;
    }

    function getPatient(
        address _address
    ) public view ownerAdminAndDoctor returns (Patient memory) {
        return patients[_address];
    }
}
