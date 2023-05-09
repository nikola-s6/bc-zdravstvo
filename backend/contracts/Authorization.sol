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

    function isOwner() internal view returns (bool) {
        return owner == msg.sender;
    }

    function isAdmin() internal view returns (bool) {
        return admins[msg.sender].exists;
    }

    function isDoctor() internal view returns (bool) {
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
}
