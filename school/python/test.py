from abc import ABC, abstractmethod

class Acount(ABC):
    @abstractmethod
    def display(self):
        pass
    @abstractmethod
    def withdraw(self,amount):
        pass
    @abstractmethod
    def deposit(self,amount):
        pass

class BankAccount(Acount):
    def __init__(self,owner,balance=0):
        self.__owner = owner
        self.__balance = balance
    @property
    def owner(self):
        return self.__owner
    @owner.setter
    def owner(self,user):
        self.__owner = user
    @property
    def balance(self):
        return self.__balance
    @balance.setter
    def balance(self,amount):
        self.__balance=amount
    def __str__(self):
        return f"{self.__owner}"
    def display(self):
        print(f'{self.__owner} has {self.__balance} Dhs')
    def withdraw(self,amount):
        if self.balance < amount:
            raise ValueError('rassidokom ghayr kafi')
        elif amount <=0:
            raise ValueError('you cant withdraw negative amount ')
        elif amount > 4000:
            raise ValueError('you can not withdraw more than 4000 in a normal account')
        self.__balance -= amount
        print(f'withdrawed {amount} new balance is :{self.__balance}')
    def deposit(self,amount):
        if amount <=0:
            raise ValueError('you cant deposit negative amount')
        self.__balance += amount
        print(f'you deposited {amount} your new balance is {self.__balance}')
    def account(self):
        print('Normal Account')

class SavingAccount(BankAccount):
    def __init__(self,owner,balance,rate=5):
        super().__init__(owner,balance)
        self.__rate = rate
    @property
    def rate(self):
        return self.__rate
    @rate.setter
    def rate(self,amount):
        self.__rate=amount
    def apply(self):
        self._BankAccount__balance += self.__rate * self.balance/100
    def account(self):
        print('Saving Account')

class BusinessAccount(BankAccount):
    def __init__(self,owner,balance):
        super().__init__(owner,balance)
    def withdraw(self, amount):
        if amount > 10000 :
            raise ValueError('You can not withdraw more than 10000 in business account')
        elif amount <= 0:
            raise ValueError('you can not widthdraw negative amount')
        elif amount > self._BankAccount__balance :
            raise ValueError('rassidokom')
        self._BankAccount__balance -= amount
        print(f'withdrawed {amount} new balance is :{self._BankAccount__balance}')
    def account(self):
        print('Business Account')
        




Acc1 = BankAccount('Mohammed',50000)
Acc2 = BankAccount('Aissa')
Acc3 = SavingAccount('Youssef',10000,4)
Acc4 = BusinessAccount('Salim',100000000)

# Acc1.display()
# Acc1.withdraw(50)
# Acc1.deposit(150)
# Acc3.display()
# Acc3.deposit(1000000)
# Acc3.apply()
# Acc3.display()
# Acc4.withdraw(6000)
# Acc1.withdraw(2000)
# Acc1.account()
# Acc3.account()
# Acc4.account()


print(Acc4)
