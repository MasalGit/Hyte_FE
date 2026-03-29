*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot

*** Test Cases ***
Test Web Form Ultimate
    New Browser    chromium    headless=No
    New Page       https://www.selenium.dev/selenium/web/web-form.html
    Wait For Elements State    [name="my-text"]    visible
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s
    Type Secret    [name="my-password"]    $Password      delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
    Select Options By    select[name="my-select"]    value    2
    Type Text    [name="my-datalist"]    Helsinki
    Upload File By Selector    input[type="file"]    ${CURDIR}/test.txt
    Check Checkbox    role=checkbox[name="Default checkbox"]
    Check Checkbox    role=radio[name="Radio 2"]
    Click With Options    button    delay=1 s
    Get Text    id=message    ==    Received!
