*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No
    New Page       http://localhost:5173/login.html

    Get Title      ==    Vite App

    Type Text      .loginForm [name="username"]    ${Username}
    Type Secret    .loginForm [name="password"]    $Password

    Click          .loginForm input[type="submit"]

    Wait Until Keyword Succeeds    5s    500ms
    ...    Check Login Response

*** Keywords ***
Check Login Response
    ${text}=    Get Text    id=loginResponse
    Should Contain    ${text}    token
