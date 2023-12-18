# mocq

🧪 data creation, connection & execution coordinator

>  for test scaffolding, mock data generation, database loads, etc.

## Concepts

consider this basic sql diagram

![](https://i.stack.imgur.com/96pFU.png)

`DutyRoster` has relationships (in this case foreign key but really the type is irrelevant) to `Event`, `EventDuty` & `Staff`.

> `mocq` allows you to take generic functions that generate data for all the various tables data structures. 
>
> then create a `workflow` that injects the various IDs from generated `Event`, `EventDuty` & `Staff` mock data into generated `DutyRoster` mock data.
>
> resulting in coherent and properly stitched together mock data.

## Getting Started

```bash
npm i --save-dev mocq
```

checkout this [example](https://github.com/nxzq/mocq/blob/main/example/sql-data-load.ts) using faker-js