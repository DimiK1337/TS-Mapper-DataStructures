# Typescript Data Structures and Algorithms

## Data Structures

- Tuples
- Arrays

## Measurements

- Memory Usage
- Performance

### Memory Usage

```typescript
let start = (performance as any).memory.usedJSHeapSize;
let nodes: node[] = [];
for (let i = 0; i < 10; i++) {
  nodes.push({ id: `id${i}`, name: `name${i}`, x: i, y: i });
}
let end = (performance as any).memory.usedJSHeapSize;
let size = end - start;
logger({
  type: "memory",
  size: size,
  operation: "add",
});
```

### Performance

```typescript
let time_one = performance.now();
add();
let time_two = performance.now();
let time_total = time_two - time_one;
logger({
  type: "performance",
  time: time_total,
  operation: "add",
});
```

## Operations

- add
- findAll
- findById (return node with specific `id`)
- findWhere (return nodes where condition match: name is `Clinical Assessment`)
- updateAll
- updateById (update and return node with specific `id`)
- updateWhere (update and return nodes where condition match: name is `Clinical Assessment`)
- deleteAll
- deleteById (delete node with specific `id`)
- deleteWhere (delete nodes where condition match: name is `Clinical Assessment`)
