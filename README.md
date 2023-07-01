# Useful information from the course

## Playwright tips&tricks

- `test.only` - runs a single tests
- `test.describe('login tests', () => {});` - groups tests by title  
  * doesn't accept the parameters yet
- `test.getByTestId` - search for attribute data-testid on the page  
  should only be present in test version of the application
- blur - unset focus from an element

### PW cmd
- npx playwright show-report
- npx playwright test tests/login.spec.ts (will not work in Win terminal format ex. .\tests\login.spec.ts)
- scrips:
  * in order to create a script (A) which runs another script (B) and pass parameters from A to B,  
  there should be extra `--` added before the parameters:
  `"test:desktop:headed" : "npm run test tests/desktop.spec.ts -- --headed"`

### PW Trace viewer
- open package trace.zip:
Navigate to test-results\<test_name> -> right-click "Open in integrated terminal"
Run the command npx playwright show-trace trace.zip


## General knowledge

### Design patterns

- AAA - Arrange Act Assert

### CSS Selectiors

- `#` - Id

### VSC howto

- File -> Auto-save

#### Shortcuts

- Shift-Alt-/ - format document







