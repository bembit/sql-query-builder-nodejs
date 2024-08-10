# UML Diagram

```plantuml
@startuml

class App {
    +/app.ts
}

class Public {
    +/index.html
    +GUI    
}

class Database {
    +/dbscripts
    +dummy.db
}

Main --> Public
Main --> Database
Database --> SaveQuery
Database --> SearchSavedQueries
Database --> LoadSavedQueries
GuiManager --> Database

@enduml
