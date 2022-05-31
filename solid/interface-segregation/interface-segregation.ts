// The interface segregation: a class should not depend on methods that it doesn't need to implement
// segregate = split

interface ISmartDevice {
    call(contact: string): void
    sendSms(contact: string, content: string): void
    openApp(path: string): void
    connectToWifi(ssid: string, password: string): void
}

class SmartPhone implements ISmartDevice {
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

    // Refactor: `Table` class doesn't need `call` and `sendSms` method,
    // but we have to add them because we implement `ISmartDevice`.
    // That violates interface segregation principle
    call(contact: string): void {
        throw new Error(`Tablet cannot call ${contact}`)
    }

    sendSms(contact: string, content: string): void {
        throw new Error(`Tablet cannot send SMS to ${contact}`)
    }

}

// Demo code
let smartPhone = new SmartPhone()
smartPhone.call("Nana")
smartPhone.sendSms("Nana", "Good morning!")

let tablet = new Tablet()
tablet.call("Nana")
tablet.sendSms("Nana", "I'm feeling blue")
