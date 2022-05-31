// The interface segregation: a class should not depend on methods that it doesn't need to implement
// segregate = split

// To refactor our code, we could segregate interface into 2 parts `ISmartDevice` and `IPhoneDevice`.

interface ISmartDevice {
    openApp(path: string): void
    connectToWifi(ssid: string, password: string): void
}

interface IPhoneDevice {
    call(contact: string): void
    sendSms(contact: string, content: string): void
}

class SmartPhone implements ISmartDevice, IPhoneDevice {
    call(contact: string): void {
        console.log(contact)
    }

    connectToWifi(ssid: string, password: string): void {
        console.log(ssid, password)
    }

    openApp(path: string): void {
        console.log(path)
    }

    sendSms(contact: string, content: string): void {
        console.log(contact, content)
    }
}

class Tablet implements ISmartDevice {
    openApp(path: string) {
        console.log(`Opening app ${path}`)
    }

    connectToWifi(ssid: string, password: string): void {
        console.log(ssid, password)
    }
}

// Demo code
let smartPhone = new SmartPhone()
smartPhone.call("Nana")
smartPhone.sendSms("Nana", "Good morning!")

// let tablet = new Tablet()
// Can't call these methods below
// tablet.call("Nana")
// tablet.sendSms("Nana", "I'm feeling blue")
