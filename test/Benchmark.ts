export class Benchmark {
  static Performance(action: Function, args?: any): any {
    const start = performance.now();
    const result = action(args);
    const end = performance.now();
    setSpecProperty("performance", { time: end - start });
    return result;
  }

  static Memory(action: Function, args?: any): any {
    const start = (performance as any).memory.usedJSHeapSize;
    const result = action(args);
    const end = (performance as any).memory.usedJSHeapSize;
    setSpecProperty("memory", { size: end - start });
    return result;
  }
}
