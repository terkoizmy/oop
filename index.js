class Bank {
    constructor (name ){
        this.name = name
        this.members = []
    }

    register(person , type , balance){
        if (type === 'platinum') {       
            if (balance < 50000){
                console.log(`Saldo awal kurang dari minimum saldo yang ditentukan`)
            } else {
                let member = new Platinum(person.name, balance, type)
                this.members.push(member)
                person.bankAccount = member
                console.log(`Selamat datang ke Yudhistira Bank, ${person.name}. Nomor Akun anda adalah ${member.accountNumber}. Total saldo adalah ${balance}`)
            }
        }
        if (type === 'silver') {       
            if (balance < 10000){
                console.log(`Saldo awal kurang dari minimum saldo yang ditentukan`)
            } else {
                let member = new Silver(person.name, balance, type)
                this.members.push(member)
                person.bankAccount = member
                console.log(`Selamat datang ke Yudhistira Bank, ${person.name}. Nomor Akun anda adalah ${member.accountNumber}. Total saldo adalah ${balance}`)
            }
        }
    }
}

class Person {
    constructor (name , bankAccount){
        this.name = name
        this.bankAccount = bankAccount
    }
}

class Member {
    constructor (memberName, minimumBalance , balance , type){
        this.memberName = memberName
        this.accountNumber = Math.floor(Math.random() * 10000000)
        this.minimumBalance = minimumBalance
        this.balance = balance
        this.transactions = []
        this.type = type
    }

    debet(nominal , note){
        let date = new Date()
        let transaction = new Transaction (nominal , 'debet' , date , note)
        if (this.balance - nominal <= this.minimumBalance && this.balance - nominal >= 0){
            console.log('saldo minimum anda tidak terpenuhi syarat')
        } else if (this.balance - nominal < 0 ) { 
            console.log('saldo tidak mencukupi')
        } else {
            this.balance -= nominal
            this.transactions.push(transaction)
            console.log('Transaksi telah tuntas')
        }
    }
    credit(nominal){
        let date = new Date()
        let transaction = new Transaction (nominal , 'credit' , date , 'nyetor')
        if(nominal <= 10000){
            console.log('masuan terlalu Rendah /-- Minimal diatas 10k --/')
        } else {
            this.balance += nominal
            this.transactions.push(transaction)
        }
    }
   
    transfer(target , nominal){
    let date = new Date()
    let debetTransaction = new Transaction (nominal , 'debet' , date ,`transfer ke akun ${target.memberName}` )
    let creditTransaction = new Transaction (nominal , 'credit' , date, `transfer dari akun ${target.memberName}` )
    if(this.balance - nominal <= this.minimumBalance ){
        console.log('masukan Gagal /-- Minimal diatas 100k --/')
    } else {
        target.balance += nominal
        this.balance -= nominal
        this.transactions.push(debetTransaction)
        target.transactions.push(creditTransaction)
    }
   }
}

class Platinum extends Member{
    constructor (memberName, balance, type){
        super(memberName ,type , balance)
        this.minimumBalance = 50000
        this.type = type
    }
}

class Silver extends Member{
    constructor (memberName, balance, type){
        super(memberName ,type , balance)
        this.minimumBalance = 10000
        this.type = type
    }
}

class Transaction {
    constructor(nominal , status , date , note){
    this.nominal = nominal
    this.status = status
    this.date = date
    this.note = note
    }
}


let yudhistiraBank = new Bank('Yudhistira Bank')
let nadia = new Person('Nadia')

yudhistiraBank.register(nadia, 'platinum', 5000)
// Saldo awal kurang dari minimum saldo yang ditentukan
yudhistiraBank.register(nadia, 'platinum', 540000)
//Selamat datang ke Yudhistira Bank, Nadia. Nomor Akun anda adalah 6332937. Total saldo adalah 50000

let nadiaAccount = nadia.bankAccount




/* PASTIKAN BAHWA SALDO SELALU BERKURANG ATAU BERTAMBAH UNTUK SETIAP TRANSAKSI */
nadiaAccount.credit(300000)
// Anda sukses menyimpan uang ke dalam bank.

nadiaAccount.credit(1000)
// Belum memenuhi minimal uang yang dapat di setor


nadiaAccount.debet(200000, 'Beli Keyboard')
// Anda sukses menarik uang dari bank

nadiaAccount.debet(480000, 'Beli Keyboard Lagi')
// Saldo minimum anda tidak terpenuhi untuk melakukan transaksi.
nadiaAccount.debet(600000, 'Bisa gak ya lebih besar dari balance ? ')
// Saldo anda tidak cukup

let semmi = new Person('Semmi Verian')
yudhistiraBank.register(semmi, 'silver', 10000000)
let semmiAccount = semmi.bankAccount

nadiaAccount.transfer(semmiAccount, 100000)
// Anda sukses transfer ke Semmi Verian
nadiaAccount.transfer(semmiAccount, 1000000)
// Anda gagal transfer ke Semmi Verian

console.log(semmiAccount)