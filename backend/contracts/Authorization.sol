// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DataStructure.sol";

contract Authorization is DataStructure {
    address private owner;
    mapping(address => Admin) internal admins;
    mapping(address => Doctor) internal doctors;

    constructor() {
        owner = msg.sender;
    }

    function addAdmin(
        address _adminAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _phoneNumber,
        string memory _email,
        string memory _rAddress
    ) external onlyOwner returns (Admin memory) {
        Admin storage admin = admins[_adminAddress];

        admin.firstName = _firstName;
        admin.lastName = _lastName;
        admin.phoneNumber = _phoneNumber;
        admin.email = _email;
        admin.rAddress = _rAddress;
        admin.exists = true;

        return admin;
    }

    function addDoctor(
        address _doctorAddress,
        string memory _firstName,
        string memory _lastName,
        string memory _phoneNumber,
        string memory _email,
        string memory _rAddress,
        Gender _gender,
        MedicalSpeciality _speciality
    ) external ownerAndAdmin returns (Doctor memory) {
        Doctor storage doctor = doctors[_doctorAddress];

        doctor.firstName = _firstName;
        doctor.lastName = _lastName;
        doctor.phoneNumber = _phoneNumber;
        doctor.email = _email;
        doctor.rAddress = _rAddress;
        doctor.gender = _gender;
        doctor.speciality = _speciality;
        doctor.exists = true;

        return doctor;
    }

    function isOwner() internal view returns (bool) {
        return owner == msg.sender;
    }

    function isAdmin() internal view returns (bool) {
        return admins[msg.sender].exists;
    }

    function isDoctor() public view returns (bool) {
        return doctors[msg.sender].exists;
    }

    // Modifiers created based on use cases needs
    modifier onlyOwner() {
        require(isOwner(), "Access restricted to owner only!");
        _;
    }

    modifier onlyDoctor() {
        require(isDoctor(), "Access restricted to doctor only!");
        _;
    }

    modifier ownerAndAdmin() {
        require(
            isOwner() || isAdmin(),
            "Access restricted to owner and admin only!"
        );
        _;
    }

    modifier ownerAdminAndDoctor() {
        require(
            isOwner() || isAdmin() || isDoctor(),
            "Access restricted to owner, admin and doctor only!"
        );
        _;
    }

    modifier ownerAdminDoctorPatient(address _address) {
        require(
            isOwner() || isAdmin() || isDoctor() || _address == msg.sender,
            "Access denied!"
        );
        _;
    }
}
