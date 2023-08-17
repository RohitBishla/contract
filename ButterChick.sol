// SPDX-License-Identifier: MIT
pragma solidity >0.7;
import {ERC20} from "./ERC20.sol";
import {Ownable} from "./Ownable.sol";

contract MyToken is ERC20, Ownable{

    mapping (address => uint8) private _roles;
    uint8 private _decimal;
    uint rewardForRefer;

    constructor() ERC20("ButterChick", "BTR") Ownable(msg.sender) public {
        _decimal = decimals();
        _mint(msg.sender, 10**18);
    }
    

    function newSignUp(address _newaddress, uint8 _role) public {
        _roles[_newaddress] = _role;
    } 

    function earnTokensViaSpend(address _userAddress, address _retailerAdress, uint _amount) onlyOwner() public {
        address ownerAddress = owner();
        uint tokensToTransfer = uint(_amount/100);

        if (tokensToTransfer > 100){
            tokensToTransfer = 100;
        }

        _transfer(ownerAddress, _userAddress, tokensToTransfer);
        _transfer(ownerAddress, _retailerAdress, tokensToTransfer);

    }

    function setRewardForRefer(uint _value) onlyOwner() public {
        rewardForRefer = _value;
    }

    function earnTokenViaReferral (address _firstUser, address _secondUser) onlyOwner() public{
        address ownerAddress = owner();
        _transfer(ownerAddress, _firstUser, rewardForRefer);
        _transfer(ownerAddress, _secondUser, rewardForRefer);
    }

    function viewBalance(address _account) public view {
        balanceOf(_account);
    }

    function viewRole(address _account) public view returns(string memory){
        string memory role;
        if (_roles[_account] == 1){
            role = "Customer";
        }
        else{
            role = "Retailer";
        }

        return role;
    }

    function redeemReward(address _userAccount, uint _price) public returns(bool){
        require(msg.sender == _userAccount);
        address ownerAddress = owner();
        _transfer(_userAccount, ownerAddress, _price);
        return true;
    }

    function rewardLoyalCustomer(address _retailerAddress, address _userAddress, uint _value) public onlyOwner() returns(bool){
        require(_roles[_retailerAddress] != 1 && _roles[_userAddress] == 1);
        _transfer(_retailerAddress, _userAddress, _value);
        return true;
    }


}

