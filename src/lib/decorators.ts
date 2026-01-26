/**
 * A class decorator that adds a static `builder()` method to the class.
 * This method returns a builder object that uses a Proxy to allow setting properties dynamically.
 * 
 * Usage:
 * @Builder
 * class User {
 *   name: string = "";
 *   email: string = "";
 * }
 * 
 * const user = (User as any).builder()
 *   .name("John")
 *   .email("john@example.com")
 *   .build();
 */
export function Builder<T extends { new (...args: any[]): {} }>(constructor: T) {
  // Add a static builder method to the constructor
  (constructor as any).builder = function () {
    const instance = new constructor();
    
    // Create a proxy to handle method calls like .name("value")
    const builderProxy = new Proxy({}, {
      get: (_target, prop) => {
        if (prop === "build") {
          return () => instance;
        }

        // Return a function that sets the property on the instance
        return (value: any) => {
          (instance as any)[prop] = value;
          return builderProxy; // Return the builder for chaining
        };
      },
    });

    return builderProxy;
  };

  return constructor;
}
