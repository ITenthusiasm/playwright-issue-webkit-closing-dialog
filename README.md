# Playwright Issue Webkit Closing Dialog

Bug: On Linux Machines, Playwright fails to close `<dialog>` elements when the `Escape` key is pressed on a `[contenteditable]` element that has focus. This is only an issue on its `WebKit` browser. This is confirmed _not_ to be a problem on MacOS 15.5. However it _is_ confirmed to be an issue on Linux:

- Ubuntu 22.04.5 LTS (Physical Machine)
- `ubuntu-latest` GitHub Actions Runner (i.e., `ubuntu-24.04` as of 2025-07-19)

The failing test case(s) can be found in [example.test.ts](./example.test.ts). To run the test(s), simply run `npx playwright test --ui`. (Or, if you don't want to run the tests in UI mode, then simply run `npx playwright test` instead.) Note that port `5173` on `localhost` _must_ be available when running this command.

**_You must run the test(s) on a `Linux` machine, on `WebKit` to reproduce the issue, as mentioned above._**
