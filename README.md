# Invoice Angular

This is a simple project for invoice management, that was build using [Angular](https://github.com/angular/angular) in version 12.

Project is designed, to be a totally offline application, that once downloaded can successfully run without access to the internet.
There is no backend communication whatsoever - everything is done in the browser. Because of that all data is stored in browser's
IndexedDB using [DexieJS](https://github.com/dfahlander/Dexie.js/) library. It is also possible to save an invoice as a PDF file.
This was possible thanks to [jsPDF](https://github.com/parallax/jsPDF).

:exclamation: Keep in mind that once you will clear your browser's database, all your data will be gone. If using this application,
please consider storing generated invoices somewhere, where they won't be deleted accidentally.

### Functionality

Demo: https://pbrzosko.github.com/invoice-angular

Application displays an OS-like view, where you can manage:

- your company details
- your parties you want issue an invoice for
- your items or services that you want to get paid for
- your invoices


Link to every page is displayed at the bottom, in a Dock-like panel. Clicking any icon will lead you to a proper page. 
If the list is empty, please use right mouse button to open a context menu, where it will be possible to create a new item.
If you click on an existing one, there will also be an option to delete it. When invoice is created, it is then possible
to enter its details and download it as PDF file.

Application is displayed in the language, that is selected in the browser's settings and will default to english language.
Currently supported languages:

- polish (pl)
- english (en)


:exclamation: Please remember to provide your company details first, otherwise it won't be possible to issue an invoice.


### Missing features

This is a work in progress, depending on my day-to-day work occupation. So please keep in mind that:

- there are no tests for now, but this has the highest priority on my list
- there is no error handling whatsoever
- bundle size could be analyzed for size reduction 


Besides that - please feel free to play with it or use in any way. :sunglasses:
