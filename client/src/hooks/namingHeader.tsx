export const useNamingHeader = (locate: string): string => {
  switch (locate) {
    case '/login':
      return 'Log In';
    case '/signup':
      return 'Sign Up';
    case '/chat':
      return 'Chat';
    case '/rooms':
      return 'Rooms';
    default:
      return "Chat on Socket.io"
  }
}