
// Abstract Product interface
interface IMessage {
  content: string;
  sender: string;
  timestamp: Date;
  render(): string;
}

// Concrete Products
class UserMessage implements IMessage {
  constructor(
    public content: string,
    public sender: string,
    public timestamp: Date = new Date()
  ) {}

  render(): string {
    return `${this.sender}: ${this.content}`;
  }
}

class SystemMessage implements IMessage {
  constructor(
    public content: string,
    public sender: string = "System",
    public timestamp: Date = new Date()
  ) {}

  render(): string {
    return `[${this.sender}] ${this.content}`;
  }
}

// Abstract Creator
abstract class MessageFactory {
  abstract createMessage(content: string, sender?: string): IMessage;
}

// Concrete Creators
class UserMessageFactory extends MessageFactory {
  createMessage(content: string, sender: string): IMessage {
    return new UserMessage(content, sender);
  }
}

class SystemMessageFactory extends MessageFactory {
  createMessage(content: string): IMessage {
    return new SystemMessage(content);
  }
}

// Usage Example:
/*
const userFactory = new UserMessageFactory();
const systemFactory = new SystemMessageFactory();

const userMsg = userFactory.createMessage("Hello!", "John");
console.log(userMsg.render()); // Output: John: Hello!

const sysMsg = systemFactory.createMessage("User connected");
console.log(sysMsg.render()); // Output: [System] User connected
*/
