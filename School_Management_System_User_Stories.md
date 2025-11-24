# User Stories and Acceptance Criteria
## School Management System

### Document Information
- **Product Name:** School Management System (SMS)
- **Version:** 1.0
- **Date:** November 2025
- **Document Owner:** CMRP Automation

---

## Table of Contents
1. [Dashboard Module](#1-dashboard-module)
2. [Academic Setup Module](#2-academic-setup-module)
3. [Admission and Testing Module](#3-admission-and-testing-module)
4. [Registrar Module](#4-registrar-module)
5. [Enrollment Module](#5-enrollment-module)
6. [Accounting and Cashiering Module](#6-accounting-and-cashiering-module)
7. [Faculty Portal](#7-faculty-portal)
8. [Student/Parent Portal](#8-studentparent-portal)
9. [UNIFAST Module](#9-unifast-module)
10. [Reports Module](#10-reports-module)
11. [User Management](#11-user-management)

---

## 1. DASHBOARD MODULE

### US-DASH-001: View Administrative Dashboard
**As a** school administrator  
**I want to** view a comprehensive dashboard  
**So that** I can monitor key metrics and access all system modules from one place

**Acceptance Criteria:**
- [ ] Dashboard displays total enrolled students for current term
- [ ] Dashboard shows total outstanding receivables amount
- [ ] Upcoming events (next 7 days) are displayed in a list view
- [ ] Quick access buttons to all authorized modules are visible
- [ ] Dashboard loads within 3 seconds
- [ ] Recent activities log shows last 10 system activities
- [ ] KPIs update in real-time or refresh every 5 minutes
- [ ] Dashboard is responsive on desktop, tablet, and mobile

### US-DASH-002: Create News and Events
**As a** school administrator  
**I want to** create and publish news and events  
**So that** students, parents, and faculty can stay informed

**Acceptance Criteria:**
- [ ] User can create new news/event entry with title, description, date, and category
- [ ] Rich text editor available for formatting content
- [ ] User can upload images (max 5MB, formats: jpg, png, gif)
- [ ] User can set visibility (Public, Students Only, Faculty Only, Parents Only)
- [ ] User can schedule publish date and time
- [ ] User can set event start and end dates
- [ ] Draft functionality available before publishing
- [ ] Success message displayed upon successful creation
- [ ] Published news appears immediately on relevant dashboards

### US-DASH-003: Edit and Archive News
**As a** school administrator  
**I want to** edit or archive existing news and events  
**So that** information stays current and accurate

**Acceptance Criteria:**
- [ ] User can search and filter news/events by date, category, status
- [ ] User can edit all fields of existing news/event
- [ ] Edit history is tracked with timestamp and editor name
- [ ] User can archive news/events (not delete)
- [ ] Archived items are hidden from public view but accessible to admins
- [ ] Confirmation dialog displayed before archiving
- [ ] User can restore archived items
- [ ] Last modified date displayed on each entry

---

## 2. ACADEMIC SETUP MODULE

### US-ACAD-001: Configure Academic Year
**As a** school administrator  
**I want to** create and configure academic years  
**So that** the system operates according to the school calendar

**Acceptance Criteria:**
- [ ] User can create new academic year with name (e.g., "2025-2026")
- [ ] User can set start date and end date
- [ ] User can divide academic year into terms/semesters (minimum 1, maximum 4)
- [ ] Each term has name, start date, end date
- [ ] Only one academic year can be marked as "active" at a time
- [ ] System validates that dates do not overlap with existing academic years
- [ ] System prevents deletion of academic year with existing enrollment data
- [ ] User can archive past academic years
- [ ] Academic year dropdown available in all relevant modules

### US-ACAD-002: Create and Manage Sections
**As a** school administrator  
**I want to** create sections for each grade/year level  
**So that** students can be organized into manageable groups

**Acceptance Criteria:**
- [ ] User can create section with code, name, grade/year level, capacity
- [ ] User can assign section to specific campus and department
- [ ] System validates that section code is unique per academic year
- [ ] User can set maximum student capacity (1-100)
- [ ] System displays current enrollment count vs capacity
- [ ] User can assign class adviser to section
- [ ] User can deactivate sections (not delete if students enrolled)
- [ ] Section list is sortable and filterable by level, campus, status
- [ ] Bulk section creation available via template upload

### US-ACAD-003: Setup Scholarship Programs
**As a** school administrator  
**I want to** configure scholarship programs  
**So that** eligible students can receive financial assistance

**Acceptance Criteria:**
- [ ] User can create scholarship with name, code, description
- [ ] User can set discount type (percentage or fixed amount)
- [ ] User can set discount value (0-100% or specific amount)
- [ ] User can define eligibility criteria (GPA requirement, income bracket, etc.)
- [ ] User can set maximum number of slots available
- [ ] User can set academic year validity
- [ ] User can assign scholarship coordinator
- [ ] User can set application period dates
- [ ] System tracks remaining slots
- [ ] User can generate scholarship reports

### US-ACAD-004: Configure Grading System
**As a** school administrator  
**I want to** customize the grading scale and policies  
**So that** grades are computed according to school standards

**Acceptance Criteria:**
- [ ] User can select grading scale type (numerical 0-100, GPA 1.0-5.0, letter grades)
- [ ] User can define passing grade
- [ ] User can configure grade equivalents (e.g., 95-100 = 1.0 = A)
- [ ] User can set weight distribution for quarters/semesters
- [ ] User can define honors criteria (e.g., GPA ≥ 3.5 for Dean's List)
- [ ] User can configure academic standing thresholds
- [ ] System validates that total weights equal 100%
- [ ] Configuration applies to specified academic year
- [ ] User can copy configuration from previous year

### US-ACAD-005: Build Curriculum
**As a** school administrator  
**I want to** create curriculum and course programs  
**So that** students follow structured academic programs

**Acceptance Criteria:**
- [ ] User can create program/course with code, name, description
- [ ] User can add subjects to curriculum with year level, semester
- [ ] User can set total units/credit hours per subject
- [ ] User can define prerequisites (multiple allowed per subject)
- [ ] User can define co-requisites
- [ ] User can categorize subjects (major, minor, elective, GE)
- [ ] System validates prerequisite chains for circular dependencies
- [ ] User can clone curriculum from existing program
- [ ] System displays total units per year level
- [ ] Curriculum version control available

### US-ACAD-006: Assign Faculty to Classes
**As a** school administrator  
**I want to** assign faculty members to subjects and sections  
**So that** classes have designated instructors

**Acceptance Criteria:**
- [ ] User can search and select faculty member
- [ ] User can assign faculty to subject and section
- [ ] System displays faculty current teaching load (total units)
- [ ] System validates maximum load per faculty (configurable)
- [ ] User can assign multiple sections to same faculty for same subject
- [ ] User can designate subject area coordinators
- [ ] User can assign class advisers to sections
- [ ] Schedule conflict checker prevents double-booking faculty
- [ ] Assignment is semester/term specific
- [ ] User can view faculty load summary report

### US-ACAD-007: Setup Academic Calendar
**As a** school administrator  
**I want to** define the academic calendar  
**So that** all users know important dates and schedules

**Acceptance Criteria:**
- [ ] User can mark holidays with name and date
- [ ] User can set enrollment period start and end dates
- [ ] User can set examination periods for each term
- [ ] User can set semester/term start and end dates
- [ ] User can add school events with dates
- [ ] Calendar entries can be categorized (holiday, exam, enrollment, etc.)
- [ ] Calendar is viewable by all user types
- [ ] Calendar supports recurring events (annual holidays)
- [ ] User can export calendar to iCal format
- [ ] Calendar displays in month, week, and list views

### US-ACAD-008: Configure Payment Plans
**As a** school administrator  
**I want to** setup payment options and installment plans  
**So that** students have flexible payment arrangements

**Acceptance Criteria:**
- [ ] User can create installment plan with name (e.g., "4-Pay Plan")
- [ ] User can set number of installments (1-12)
- [ ] User can set down payment percentage (0-100%)
- [ ] User can set due dates for each installment
- [ ] User can configure late payment penalty (percentage or fixed amount)
- [ ] User can set grace period days before penalty applies
- [ ] System automatically computes installment amounts
- [ ] Plan can be limited to specific programs or year levels
- [ ] User can activate/deactivate payment plans
- [ ] Plans are selectable during enrollment

### US-ACAD-009: Setup Chart of Accounts
**As a** school administrator  
**I want to** define the chart of accounts  
**So that** fees are properly categorized for financial reporting

**Acceptance Criteria:**
- [ ] User can create account category (Tuition, Miscellaneous, Laboratory, etc.)
- [ ] User can assign account code (unique identifier)
- [ ] User can set account type (Revenue, Liability, Asset)
- [ ] User can define sub-accounts under main accounts
- [ ] User can set tax applicability per account
- [ ] System validates unique account codes
- [ ] User can activate/deactivate accounts
- [ ] Accounts are used in fee assessment and reporting
- [ ] User can generate chart of accounts report
- [ ] Account hierarchy supports up to 3 levels

---

## 3. ADMISSION AND TESTING MODULE

### US-ADM-001: Submit Online Application
**As a** prospective student  
**I want to** submit an online application  
**So that** I can apply for admission without visiting campus

**Acceptance Criteria:**
- [ ] Applicant can access application form without login
- [ ] Form collects personal info (name, birthdate, gender, contact)
- [ ] Form collects educational background (previous school, grade level)
- [ ] Form collects family information (parents/guardians)
- [ ] Applicant can upload required documents (birth cert, report card, etc.)
- [ ] Upload supports PDF, JPG, PNG formats (max 5MB per file)
- [ ] Form validates required fields before submission
- [ ] Form validates email format and phone number format
- [ ] Application fee amount is displayed
- [ ] Applicant receives unique application number upon submission
- [ ] Confirmation email sent with application number
- [ ] Applicant can save draft and continue later

### US-ADM-002: Pay Application Fee Online
**As a** prospective student  
**I want to** pay the application fee online  
**So that** my application can be processed immediately

**Acceptance Criteria:**
- [ ] System displays application fee amount
- [ ] Payment methods available: credit card, e-wallet, online banking
- [ ] Payment gateway redirects to secure payment page
- [ ] System receives payment confirmation from gateway
- [ ] Application status updates to "Paid" upon successful payment
- [ ] Official receipt is generated and emailed
- [ ] Payment transaction is recorded in accounting module
- [ ] Applicant can download receipt from portal
- [ ] Failed payments are logged and applicant is notified
- [ ] Applicant can retry payment if failed

### US-ADM-003: Schedule Entrance Exam
**As an** admissions officer  
**I want to** schedule entrance exams for applicants  
**So that** applicants know when to take the test

**Acceptance Criteria:**
- [ ] Officer can view list of applicants with paid application fees
- [ ] Officer can select multiple applicants for batch scheduling
- [ ] Officer can set exam date, time, and venue
- [ ] Officer can set exam type (entrance, diagnostic, placement)
- [ ] System validates venue capacity vs number of applicants
- [ ] Email notification sent to applicant with exam details
- [ ] SMS notification option available
- [ ] Applicant can view exam schedule in their portal
- [ ] Officer can reschedule exam with notification
- [ ] System prevents double-booking of venue and time slot

### US-ADM-004: Record Entrance Test Results
**As an** admissions officer  
**I want to** record entrance test results  
**So that** qualified applicants can be identified

**Acceptance Criteria:**
- [ ] Officer can search for applicant by name or application number
- [ ] Officer can enter test scores for each subject area
- [ ] System computes total score and percentage
- [ ] Officer can mark test status (Completed, Absent, Incomplete)
- [ ] System compares score against passing criteria
- [ ] Applicant status updates automatically (Passed/Failed)
- [ ] Officer can add notes/remarks per applicant
- [ ] Bulk import of test results via Excel template
- [ ] System generates test ranking report
- [ ] Failed applicants are notified via email

### US-ADM-005: Conduct Interview Assessment
**As an** admissions officer  
**I want to** conduct and record interview assessments  
**So that** holistic evaluation of applicants is documented

**Acceptance Criteria:**
- [ ] Officer can schedule interview date and time per applicant
- [ ] Interview evaluation form is configurable (add/remove criteria)
- [ ] Officer can rate applicant on multiple criteria (1-5 scale)
- [ ] Officer can add interview notes and observations
- [ ] Officer can upload supporting documents from interview
- [ ] System computes average interview score
- [ ] Officer can mark recommendation (Highly Recommended, Recommended, Not Recommended)
- [ ] Multiple interviewers can add separate assessments
- [ ] Applicant notification sent after interview scheduled
- [ ] Interview results factor into final admission decision

### US-ADM-006: Check Application Requirements
**As an** admissions officer  
**I want to** track submitted requirements  
**So that** I can ensure all documents are complete

**Acceptance Criteria:**
- [ ] System displays checklist of required documents per applicant
- [ ] Officer can mark each requirement as Submitted, Pending, or Verified
- [ ] Officer can view uploaded documents
- [ ] Officer can request additional documents via notification
- [ ] Applicant receives notification of missing requirements
- [ ] Officer can add remarks per requirement
- [ ] Application status shows "Complete" only when all verified
- [ ] System sends reminder email for pending requirements after 7 days
- [ ] Officer can print requirements checklist
- [ ] Document verification date and officer name are logged

### US-ADM-007: Send Admission Decision
**As an** admissions officer  
**I want to** notify qualified applicants of admission  
**So that** they can proceed with enrollment

**Acceptance Criteria:**
- [ ] Officer can select qualified applicants (passed test and interview)
- [ ] Officer can send bulk admission notification emails
- [ ] Email contains congratulatory message and next steps
- [ ] Email includes enrollment instructions and deadline
- [ ] Email includes link to student portal for enrollment
- [ ] Application status updates to "Admitted"
- [ ] Officer can customize email template
- [ ] Non-qualified applicants receive rejection email (optional)
- [ ] Notification log is maintained for audit
- [ ] System generates admission statistics report

### US-ADM-008: Generate Admission Reports
**As an** admissions officer  
**I want to** generate admission reports and analytics  
**So that** I can analyze application trends and success rates

**Acceptance Criteria:**
- [ ] Report shows total applications received per period
- [ ] Report shows acceptance rate (admitted/total applicants)
- [ ] Report shows demographic breakdown (gender, location, previous school)
- [ ] Report shows test score distribution
- [ ] Report shows top applicants by test ranking
- [ ] Report shows conversion rate (admitted vs enrolled)
- [ ] Report can be filtered by date range, program, campus
- [ ] Report can be exported to Excel, PDF
- [ ] Report includes charts and graphs
- [ ] Report generation completes within 30 seconds

---

## 4. REGISTRAR MODULE

### US-REG-001: View Student Master List
**As a** registrar  
**I want to** view and search all students  
**So that** I can quickly access student records

**Acceptance Criteria:**
- [ ] List displays all active students with ID, name, program, year level
- [ ] User can search by student ID, name, or email
- [ ] User can filter by campus, program, year level, section, status
- [ ] List supports pagination (50 records per page)
- [ ] User can sort by any column (ascending/descending)
- [ ] List shows total student count
- [ ] User can export filtered list to Excel
- [ ] User can click student name to view full profile
- [ ] List updates in real-time when new students are added
- [ ] Advanced search supports multiple criteria

### US-REG-002: Manage Student Profile
**As a** registrar  
**I want to** view and update student profiles  
**So that** student information is accurate and complete

**Acceptance Criteria:**
- [ ] Profile displays complete personal information
- [ ] Profile shows enrollment history (all terms)
- [ ] Profile shows academic records (grades per term)
- [ ] Profile shows financial summary (total fees, payments, balance)
- [ ] Profile shows discipline records if any
- [ ] Profile includes emergency contacts
- [ ] User can edit demographic information
- [ ] User can upload student photo
- [ ] User can attach documents (medical records, clearances, etc.)
- [ ] All changes are logged with timestamp and user
- [ ] Profile is printable
- [ ] User can change student status (active, LOA, dropped, graduated)

### US-REG-003: Manage Subject Master List
**As a** registrar  
**I want to** maintain the subject catalog  
**So that** all subjects are properly documented

**Acceptance Criteria:**
- [ ] User can add new subject with code, title, description
- [ ] User can set subject units/credit hours
- [ ] User can assign subject to department/college
- [ ] User can define prerequisites (multiple subjects allowed)
- [ ] User can define co-requisites
- [ ] User can categorize subject (lecture, laboratory, lecture+lab)
- [ ] System validates unique subject codes
- [ ] User can set subject status (active, inactive)
- [ ] User can view subjects offering schedule per term
- [ ] User can view enrollment statistics per subject
- [ ] Subject list is searchable and filterable
- [ ] Bulk subject import via Excel template

### US-REG-004: Generate Student Certificates
**As a** registrar  
**I want to** generate student certificates  
**So that** students receive official documents

**Acceptance Criteria:**
- [ ] User can select certificate type (Enrollment, Graduation, Transfer Credential, GMC)
- [ ] User can search and select student
- [ ] System validates student eligibility for selected certificate type
- [ ] Certificate template is pre-designed and customizable
- [ ] Certificate includes student details, dates, and school seal
- [ ] Certificate includes digital signature or signature placeholder
- [ ] User can preview certificate before printing
- [ ] User can print certificate on official paper
- [ ] Certificate generation is logged with date and issuer
- [ ] User can reprint certificates
- [ ] Bulk certificate generation for graduation
- [ ] Certificate has unique tracking number

### US-REG-005: Generate Top Students Report
**As a** registrar  
**I want to** generate top students reports  
**So that** high achievers can be recognized

**Acceptance Criteria:**
- [ ] User can select report type (Dean's List, Honor Roll, Top 10)
- [ ] User can filter by college/department, year level, term
- [ ] Report displays students ranked by GPA
- [ ] Report shows student name, ID, program, GPA
- [ ] Report includes criteria used for ranking
- [ ] User can set minimum GPA requirement
- [ ] Report excludes students with disciplinary actions (optional)
- [ ] Report can be exported to Excel, PDF
- [ ] Report is printable with school header
- [ ] Report includes generation date and prepared by

### US-REG-006: Print Student ID Cards
**As a** registrar  
**I want to** print student ID cards  
**So that** students have official identification

**Acceptance Criteria:**
- [ ] User can select students for ID printing (individual or batch)
- [ ] ID design template is configurable (layout, fields, logo)
- [ ] ID includes student photo, name, ID number, program, validity dates
- [ ] ID includes barcode or QR code for scanning
- [ ] System validates that student photo is uploaded
- [ ] User can preview ID before printing
- [ ] Supports standard ID card printer
- [ ] User can mark IDs as printed to avoid duplicates
- [ ] Reprint option available for lost/damaged IDs
- [ ] ID printing log maintained
- [ ] Supports batch printing (50+ IDs)

---

## 5. ENROLLMENT MODULE

### US-ENR-001: Enroll Students Online
**As a** student  
**I want to** enroll in subjects online  
**So that** I don't need to visit campus for enrollment

**Acceptance Criteria:**
- [ ] Student logs in to enrollment portal
- [ ] System displays available subjects based on curriculum
- [ ] System shows only subjects where prerequisites are met
- [ ] Student can view subject details (schedule, units, instructor, slots)
- [ ] Student can add subject to enrollment cart
- [ ] System validates schedule conflicts in real-time
- [ ] System shows remaining available slots per subject
- [ ] Student can remove subjects from cart
- [ ] Student can view total units and fee assessment
- [ ] Student submits enrollment for processing
- [ ] Confirmation message and enrollment form generated
- [ ] Email confirmation sent with enrolled subjects

### US-ENR-002: Block Section Registration
**As a** student  
**I want to** enroll in a pre-defined block section  
**So that** I can quickly register for all required subjects

**Acceptance Criteria:**
- [ ] System displays available block sections for student's program and level
- [ ] Block section shows complete list of subjects with schedules
- [ ] Student can view total units and fee assessment for block
- [ ] Student can enroll in entire block with one click
- [ ] System validates student eligibility (year level, prerequisites)
- [ ] System checks section capacity and prevents over-enrollment
- [ ] System checks for schedule conflicts with previously enrolled subjects
- [ ] Enrollment confirmation shows all subjects in block
- [ ] Student cannot partially enroll in block (all or nothing)
- [ ] Block enrollment counts as official enrollment upon submission

### US-ENR-003: Pre-register Students
**As a** enrollment officer  
**I want to** pre-register students for next term  
**So that** enrollment process is faster during enrollment period

**Acceptance Criteria:**
- [ ] Officer can select students for pre-registration (by section, year level)
- [ ] Officer can assign block section or individual subjects
- [ ] System validates prerequisites and eligibility
- [ ] Pre-registration status is marked as "Pre-registered"
- [ ] Students can view pre-registered subjects in portal
- [ ] Students can modify pre-registered subjects during enrollment period
- [ ] Pre-registration can be converted to official enrollment
- [ ] Officer can bulk import pre-registration via Excel
- [ ] System sends notification to pre-registered students
- [ ] Pre-registration does not block subject slots until confirmed

### US-ENR-004: Print Enrollment Assessment
**As a** student  
**I want to** print my enrollment assessment form  
**So that** I can proceed to payment

**Acceptance Criteria:**
- [ ] Student can access assessment from enrollment portal
- [ ] Assessment shows complete breakdown of fees (tuition, misc., lab, etc.)
- [ ] Assessment shows scholarship/discount applied if any
- [ ] Assessment shows payment plan selected
- [ ] Assessment shows total amount due
- [ ] Assessment includes list of enrolled subjects with units
- [ ] Assessment includes payment instructions
- [ ] Assessment is printable on letter-size paper
- [ ] Assessment includes student details and enrollment date
- [ ] Assessment includes OR number field (to be filled after payment)
- [ ] PDF download option available

### US-ENR-005: Monitor Enrolled Students
**As an** enrollment officer  
**I want to** monitor enrollment status  
**So that** I can track enrollment progress

**Acceptance Criteria:**
- [ ] Dashboard shows total registered vs officially enrolled students
- [ ] Dashboard shows enrollment count per program/year level
- [ ] Officer can view list of registered but unpaid students
- [ ] Officer can view list of officially enrolled students
- [ ] List includes student name, ID, program, total units, payment status
- [ ] Officer can filter by campus, program, status, date range
- [ ] Officer can export list to Excel
- [ ] Real-time update as students enroll
- [ ] Visual charts show enrollment trends
- [ ] Comparison with target enrollment numbers

### US-ENR-006: Manage Class Sections
**As an** enrollment officer  
**I want to** create and manage class sections  
**So that** students can enroll in organized classes

**Acceptance Criteria:**
- [ ] Officer can create section for subject with section code
- [ ] Officer can set section capacity (max students)
- [ ] Officer can assign instructor to section
- [ ] Officer can set class schedule (day, time, room)
- [ ] System validates no schedule conflicts for instructor or room
- [ ] Officer can view current enrollment count per section
- [ ] Officer can increase/decrease section capacity
- [ ] Officer can close section enrollment when full
- [ ] Officer can merge or split sections
- [ ] System prevents deletion of section with enrolled students

### US-ENR-007: Create Class Schedules
**As an** enrollment officer  
**I want to** create comprehensive class schedules  
**So that** all sections have assigned time and venue

**Acceptance Criteria:**
- [ ] Officer can view schedule matrix (time blocks x days of week)
- [ ] Officer can drag and drop sections onto time slots
- [ ] System highlights conflicts (room double-booking, instructor overlap)
- [ ] Officer can assign room to each section
- [ ] System validates room capacity vs section enrollment
- [ ] Officer can view schedule by room, instructor, or section
- [ ] Officer can print schedule by different views
- [ ] Officer can export schedule to Excel or PDF
- [ ] Schedule changes trigger notification to affected students/faculty
- [ ] Historical schedules are archived per term

### US-ENR-008: Check Schedule Conflicts
**As an** enrollment officer  
**I want to** automatically detect schedule conflicts  
**So that** scheduling errors are prevented

**Acceptance Criteria:**
- [ ] System checks for student schedule conflicts during enrollment
- [ ] System checks for faculty schedule conflicts during assignment
- [ ] System checks for room conflicts during scheduling
- [ ] System displays clear conflict error message
- [ ] Conflict details show overlapping sections/times
- [ ] System prevents saving conflicting schedules
- [ ] Officer can override conflicts with proper authorization
- [ ] Conflict check runs in real-time (<2 seconds)
- [ ] Conflict report can be generated for review
- [ ] System logs all conflict overrides

---

## 6. ACCOUNTING AND CASHIERING MODULE

### US-ACC-001: Configure Fee Structure
**As an** accounting officer  
**I want to** setup table of fees  
**So that** student assessments are accurate

**Acceptance Criteria:**
- [ ] Officer can create fee item with name, code, amount
- [ ] Officer can assign fee category (tuition, miscellaneous, laboratory, etc.)
- [ ] Officer can link fee to specific programs or year levels
- [ ] Officer can set fee as per-unit or fixed amount
- [ ] Officer can set fee applicability (all students, specific conditions)
- [ ] Officer can set effective date for fee
- [ ] System validates unique fee codes
- [ ] Officer can activate/deactivate fees
- [ ] Fee structure can be cloned from previous term
- [ ] Changes to fees are logged with date and user

### US-ACC-002: Generate Student Assessment
**As an** accounting officer  
**I want to** automatically generate fee assessment  
**So that** students know their total fees

**Acceptance Criteria:**
- [ ] System computes tuition based on enrolled units and rate per unit
- [ ] System adds applicable miscellaneous fees
- [ ] System adds laboratory fees for lab subjects
- [ ] System applies scholarship discounts automatically
- [ ] System applies payment plan if selected
- [ ] Assessment shows itemized fee breakdown
- [ ] Assessment shows net amount due after discounts
- [ ] Assessment includes due dates per installment (if applicable)
- [ ] Assessment is generated immediately after enrollment confirmation
- [ ] Student can view assessment in portal
- [ ] Assessment is printable and emailable

### US-ACC-003: Process Student Payments
**As a** cashier  
**I want to** record student payments  
**So that** accounts are updated accurately

**Acceptance Criteria:**
- [ ] Cashier can search student by ID or name
- [ ] System displays student ledger with outstanding balance
- [ ] Cashier can select payment method (cash, check, online, installment)
- [ ] Cashier enters payment amount
- [ ] System allocates payment to oldest charges first (or configurable)
- [ ] System updates student balance in real-time
- [ ] Official Receipt is auto-generated with sequential OR number
- [ ] OR includes student details, items paid, amount, date, cashier name
- [ ] OR is printable (original and duplicate)
- [ ] Payment transaction is posted to accounting ledger
- [ ] System prevents duplicate OR numbers
- [ ] Cashier can void/cancel OR with supervisor approval

### US-ACC-004: Manage Student Ledger
**As an** accounting officer  
**I want to** view detailed student ledger  
**So that** I can track all financial transactions per student

**Acceptance Criteria:**
- [ ] Ledger shows all charges posted to student account
- [ ] Ledger shows all payments received with OR numbers
- [ ] Ledger shows all adjustments (credits, debits)
- [ ] Ledger displays running balance after each transaction
- [ ] Ledger shows transaction date and posted by
- [ ] Officer can filter transactions by date range or type
- [ ] Officer can export ledger to Excel or PDF
- [ ] Ledger is printable as Statement of Account
- [ ] Ledger shows aging of receivables (current, 30, 60, 90+ days)
- [ ] Officer can add notes/remarks per transaction

### US-ACC-005: Process Promissory Notes
**As an** accounting officer  
**I want to** issue promissory notes for payment arrangements  
**So that** students can enroll with payment commitment

**Acceptance Criteria:**
- [ ] Officer can create promissory note for student
- [ ] PN includes principal amount, payment schedule, due dates
- [ ] Officer can set interest rate if applicable
- [ ] Officer can require co-maker information
- [ ] PN requires student and co-maker signatures (digital or scanned upload)
- [ ] PN requires approval from authorized officer
- [ ] PN is printable with terms and conditions
- [ ] System tracks PN payment schedule and sends reminders
- [ ] Student account is marked with active PN
- [ ] Officer can view all active/overdue PNs
- [ ] System prevents new enrollment if PN is defaulted

### US-ACC-006: Issue Debit/Credit Memos
**As an** accounting officer  
**I want to** issue debit and credit memos  
**So that** account adjustments are properly documented

**Acceptance Criteria:**
- [ ] Officer can create debit memo to add charges to student account
- [ ] Officer can create credit memo to reduce charges
- [ ] Memo requires reason/description
- [ ] Memo requires approval from supervisor for amounts >₱5,000
- [ ] Memo is posted to student ledger immediately
- [ ] Memo has unique document number
- [ ] Memo is linked to original assessment or OR
- [ ] Officer can print memo for student
- [ ] Memo includes student details, amount, date, issued by
- [ ] All memos are logged for audit trail
- [ ] Student is notified of memo via email

### US-ACC-007: Generate Official Receipts
**As a** cashier  
**I want to** generate official receipts automatically  
**So that** payments are properly documented

**Acceptance Criteria:**
- [ ] OR is auto-generated upon payment posting
- [ ] OR has sequential numbering with no gaps
- [ ] OR includes date, student name, amount in words and figures
- [ ] OR includes breakdown of payment allocation
- [ ] OR includes payment method
- [ ] OR includes cashier name and signature
- [ ] OR is formatted according to BIR requirements
- [ ] Duplicate/triplicate copies available
- [ ] OR can be reprinted with "DUPLICATE COPY" watermark
- [ ] Cancelled ORs are marked and logged
- [ ] System prevents manual OR number entry

### US-ACC-008: Process Student Clearance
**As an** accounting officer  
**I want to** verify student financial clearance  
**So that** students can proceed with graduation or transfer

**Acceptance Criteria:**
- [ ] Officer can search student for clearance
- [ ] System displays all outstanding balances and accountabilities
- [ ] Officer can view clearance status from all departments
- [ ] Accounting clearance shows "Cleared" only if balance is zero
- [ ] Officer can add remarks to clearance
- [ ] System prevents clearance if there are active promissory notes
- [ ] Clearance approval date is logged
- [ ] Student can view clearance status in portal
- [ ] Officer can print clearance certificate
- [ ] Clearance required for graduation processing and TOR release

### US-ACC-009: Generate Aging Report
**As an** accounting officer  
**I want to** generate accounts receivable aging report  
**So that** I can monitor collection priorities

**Acceptance Criteria:**
- [ ] Report categorizes receivables by age (Current, 1-30, 31-60, 61-90, 90+ days)
- [ ] Report shows total amount per aging category
- [ ] Report lists students with balances
- [ ] Report shows student name, ID, program, total balance, aged amounts
- [ ] Officer can filter by program, year level, campus
- [ ] Report highlights critically overdue accounts (90+ days)
- [ ] Report can be exported to Excel for further analysis
- [ ] Report includes summary totals
- [ ] Report can be scheduled for automatic generation (weekly/monthly)
- [ ] Report generation completes within 30 seconds

### US-ACC-010: Process Financial Assistance
**As an** accounting officer  
**I want to** apply scholarships and grants to student accounts  
**So that** eligible students receive financial aid

**Acceptance Criteria:**
- [ ] Officer can search and select student
- [ ] Officer can assign scholarship or grant program
- [ ] System validates student eligibility based on scholarship criteria
- [ ] System computes discount amount (percentage or fixed)
- [ ] Discount is applied to assessment automatically
- [ ] Student ledger shows scholarship as credit
- [ ] Officer can apply multiple scholarships if allowed
- [ ] System tracks total financial assistance per student
- [ ] Financial assistance is renewable per term (requires re-application)
- [ ] Officer can generate financial assistance report

### US-ACC-011: Generate Daily Collection Report
**As a** cashier supervisor  
**I want to** generate daily collection report  
**So that** daily transactions are reconciled

**Acceptance Criteria:**
- [ ] Report shows all ORs issued for selected date
- [ ] Report shows total collections by payment method
- [ ] Report shows breakdown by fee category
- [ ] Report includes cashier name per transaction
- [ ] Report shows opening and closing OR numbers
- [ ] Report includes cancelled/voided ORs
- [ ] Report totals match bank deposit amount
- [ ] Report can be printed for cashier remittance
- [ ] Report is exportable to Excel
- [ ] Report includes summary section for management

---

## 7. FACULTY PORTAL

### US-FAC-001: View Faculty Dashboard
**As a** faculty member  
**I want to** view my dashboard  
**So that** I can see my schedule and announcements

**Acceptance Criteria:**
- [ ] Dashboard displays current teaching schedule (today and upcoming week)
- [ ] Dashboard shows upcoming deadlines (grade submission, etc.)
- [ ] Dashboard displays recent announcements from school
- [ ] Quick links to class records for all assigned classes
- [ ] Dashboard shows total teaching load (units)
- [ ] Dashboard displays office/consultation hours
- [ ] Dashboard is the default landing page upon login
- [ ] Dashboard refreshes automatically or has manual refresh button
- [ ] Dashboard is responsive on mobile devices

### US-FAC-002: View Teaching Load
**As a** faculty member  
**I want to** view my complete teaching load  
**So that** I know all my class assignments

**Acceptance Criteria:**
- [ ] Page displays all assigned subjects for current term
- [ ] Each subject shows section, schedule (day/time), room, enrolled count
- [ ] Page shows total units taught
- [ ] Faculty can view subject description and curriculum details
- [ ] Faculty can download teaching load summary as PDF
- [ ] Page includes department chair/coordinator contact info
- [ ] Historical teaching loads accessible for previous terms
- [ ] Faculty can report discrepancies to registrar

### US-FAC-003: View Class List
**As a** faculty member  
**I want to** view my class roster  
**So that** I know which students are enrolled in my classes

**Acceptance Criteria:**
- [ ] Faculty selects subject and section
- [ ] Page displays list of enrolled students
- [ ] List shows student name, ID, program, photo
- [ ] List is sortable by name or student ID
- [ ] Faculty can view individual student profile (contact info only)
- [ ] Faculty can print class list
- [ ] Faculty can export class list to Excel
- [ ] List updates if students add/drop after initial enrollment
- [ ] Dropped students are marked accordingly

### US-FAC-004: Record Student Attendance
**As a** faculty member  
**I want to** record student attendance  
**So that** attendance is tracked for each class meeting

**Acceptance Criteria:**
- [ ] Faculty selects class and date
- [ ] System displays class roster with attendance checkboxes
- [ ] Faculty can mark each student as Present, Absent, Late, Excused
- [ ] Faculty can add remarks per student per date
- [ ] Bulk actions available (mark all present)
- [ ] Attendance is saved in real-time or with save button
- [ ] Faculty can edit previous attendance entries
- [ ] System computes attendance percentage per student
- [ ] Attendance report can be generated and printed
- [ ] Mobile-friendly interface for recording during class

### US-FAC-005: Encode Student Grades
**As a** faculty member  
**I want to** encode student grades  
**So that** academic performance is recorded

**Acceptance Criteria:**
- [ ] Faculty selects subject, section, and grading period (quarter/midterm/final)
- [ ] System displays roster with grade entry fields
- [ ] Faculty can enter numerical grades or letter grades based on system config
- [ ] System validates grade format and range
- [ ] Faculty can enter incomplete (INC) or dropped (DRP) status
- [ ] Faculty can add remarks per student
- [ ] System computes average grades based on configured weights
- [ ] Faculty can save draft grades before submission
- [ ] Submission requires confirmation
- [ ] Once submitted, grades are locked (requires special permission to edit)
- [ ] Faculty can view grade encoding deadline
- [ ] System sends reminder email approaching deadline

### US-FAC-006: Submit Grades
**As a** faculty member  
**I want to** officially submit grades  
**So that** grades become final and visible to students

**Acceptance Criteria:**
- [ ] Faculty can review all grades before submission
- [ ] System validates that all students have grades entered
- [ ] Confirmation dialog displayed before final submission
- [ ] Submission timestamp is recorded
- [ ] Submitted grades become visible to students immediately
- [ ] Faculty receives confirmation email of successful submission
- [ ] Submitted grades appear in student transcripts
- [ ] Registrar is notified of submission
- [ ] Faculty cannot edit submitted grades without approval
- [ ] System tracks submission history per term

---

## 8. STUDENT/PARENT PORTAL

### US-STU-001: View Student Dashboard
**As a** student  
**I want to** view my personalized dashboard  
**So that** I can see important information at a glance

**Acceptance Criteria:**
- [ ] Dashboard displays current enrolled subjects and schedule
- [ ] Dashboard shows account balance and payment due dates
- [ ] Dashboard displays recent grades if available
- [ ] Dashboard shows upcoming events and announcements
- [ ] Dashboard displays attendance summary
- [ ] Quick links to common tasks (view grades, pay online, etc.)
- [ ] Dashboard displays student photo and basic profile
- [ ] Dashboard shows current term and academic year
- [ ] Dashboard is mobile responsive

### US-STU-002: View Class Schedule
**As a** student  
**I want to** view my class schedule  
**So that** I know when and where my classes are

**Acceptance Criteria:**
- [ ] Schedule displays in weekly calendar view
- [ ] Each class shows subject code, title, time, room, instructor
- [ ] Schedule can be toggled to list view
- [ ] Student can print schedule
- [ ] Student can download schedule as PDF or image
- [ ] Schedule includes instructor contact information
- [ ] Color-coded by subject type (lecture, lab)
- [ ] Schedule updates immediately if there are room/time changes
- [ ] Student receives notification of schedule changes

### US-STU-003: View Grades
**As a** student  
**I want to** view my academic grades  
**So that** I can monitor my academic performance

**Acceptance Criteria:**
- [ ] Student can select term/semester to view grades
- [ ] Grades displayed by subject with grade value
- [ ] System shows grading period (prelim, midterm, finals)
- [ ] System displays computed final grade per subject
- [ ] System displays GPA for the term
- [ ] System shows cumulative GPA for all terms
- [ ] Grades are visible only after faculty submission
- [ ] Student can view historical grades for previous terms
- [ ] Student can print grade report
- [ ] Conduct grades displayed separately

### US-STU-004: View Statement of Account
**As a** student  
**I want to** view my statement of account  
**So that** I know my financial obligations

**Acceptance Criteria:**
- [ ] SOA displays all assessed fees with amounts
- [ ] SOA shows all payments received with dates and OR numbers
- [ ] SOA displays current outstanding balance
- [ ] SOA shows payment due dates for installments
- [ ] SOA shows scholarship/discounts applied
- [ ] Student can view SOA for current and previous terms
- [ ] SOA is printable
- [ ] SOA includes payment instructions
- [ ] SOA shows aging of balance (overdue amount highlighted)
- [ ] Student can download SOA as PDF

### US-STU-005: Update Parent Information
**As a** student or parent  
**I want to** update parent/guardian information  
**So that** school has current contact details

**Acceptance Criteria:**
- [ ] User can edit father's information (name, occupation, education, contact)
- [ ] User can edit mother's information (name, occupation, education, contact)
- [ ] User can add/edit guardian information if applicable
- [ ] User can upload parent photo (optional)
- [ ] User can add emergency contact details
- [ ] User can update home address
- [ ] Required fields are validated before saving
- [ ] Changes are saved with confirmation message
- [ ] Registrar is notified of significant changes
- [ ] Updates are reflected immediately in student profile

### US-STU-006: View School Calendar
**As a** student  
**I want to** view the school academic calendar  
**So that** I am aware of important dates

**Acceptance Criteria:**
- [ ] Calendar displays in month view with events
- [ ] Calendar shows holidays, exam periods, enrollment dates
- [ ] Student can click event for more details
- [ ] Calendar can be filtered by event type
- [ ] Calendar includes parent-teacher conference dates
- [ ] Student can export calendar to personal calendar app
- [ ] Calendar highlights upcoming events (next 7 days)
- [ ] Calendar is printable

### US-STU-007: View Medical Records
**As a** student  
**I want to** view my clinical and medical records  
**So that** I can track my health information

**Acceptance Criteria:**
- [ ] Medical records show immunization history
- [ ] Records show clinic visit logs with date and reason
- [ ] Records show medical conditions on file
- [ ] Records show medications if any
- [ ] Student can upload medical certificates
- [ ] Parent can view student's medical records
- [ ] Medical information is only accessible to authorized users
- [ ] Student can print medical summary
- [ ] Medical records include blood type and allergies

### US-STU-008: View Student Accountabilities
**As a** student  
**I want to** view my accountabilities  
**So that** I can ensure clearance before graduation

**Acceptance Criteria:**
- [ ] Page shows library books borrowed and return status
- [ ] Page shows pending clinic clearance requirements
- [ ] Page shows student affairs clearance status
- [ ] Page shows facility/equipment usage records
- [ ] Each accountability shows status (cleared, pending, overdue)
- [ ] Student can view details and deadlines for each accountability
- [ ] Page shows overall clearance status
- [ ] Notifications sent for overdue accountabilities
- [ ] Student can contact relevant office directly from page

### US-STU-009: Enroll Online via Portal
**As a** student  
**I want to** complete online enrollment  
**So that** I can register for classes conveniently

**Acceptance Criteria:**
- [ ] Student logs into enrollment portal during enrollment period
- [ ] System displays enrollment instructions
- [ ] Student can update parent information if needed
- [ ] Student selects subjects or block section
- [ ] System shows real-time subject availability and schedule
- [ ] Student can view assessment before confirming enrollment
- [ ] Student selects payment plan
- [ ] Student confirms enrollment
- [ ] Enrollment form is generated for printing
- [ ] Student proceeds to online payment or cashier

### US-STU-010: Pay Online
**As a** student  
**I want to** pay tuition fees online  
**So that** I can complete enrollment without visiting campus

**Acceptance Criteria:**
- [ ] Student views total amount due
- [ ] Student selects payment gateway (DragonPay, PayMaya, PayPal, GCash, LandBank)
- [ ] Student is redirected to secure payment page
- [ ] Student enters payment details
- [ ] Payment confirmation is received immediately
- [ ] Official Receipt is generated and emailed
- [ ] Student account is updated with payment
- [ ] Enrollment status changes to "Officially Enrolled"
- [ ] Student can download OR from portal
- [ ] Failed payments can be retried
- [ ] Payment transaction reference is saved

---

## 9. UNIFAST MODULE

### US-UNI-001: Identify UNIFAST Eligible Students
**As an** accounting officer  
**I want to** identify UNIFAST-eligible students  
**So that** free tuition subsidy can be applied

**Acceptance Criteria:**
- [ ] Officer can upload list of UNIFAST beneficiaries (student IDs)
- [ ] System matches student IDs with enrolled students
- [ ] System marks matched students as UNIFAST-eligible
- [ ] Officer can manually tag individual students as eligible
- [ ] System validates student eligibility criteria (program, year level)
- [ ] Eligible students are flagged in enrollment records
- [ ] Officer can view list of all UNIFAST students
- [ ] Officer can export UNIFAST list for government reporting
- [ ] System prevents duplicate marking

### US-UNI-002: Compute Free Tuition Billing
**As an** accounting officer  
**I want to** compute UNIFAST billing amounts  
**So that** government subsidy is correctly applied

**Acceptance Criteria:**
- [ ] System identifies tuition fee component from total assessment
- [ ] System computes government share (up to ₱40,000 cap per semester)
- [ ] System computes student share (remaining tuition + other fees)
- [ ] System generates UNIFAST billing statement with breakdown
- [ ] Billing shows original tuition, subsidy amount, net student payment
- [ ] Billing complies with CHED/UNIFAST format requirements
- [ ] Officer can adjust subsidy amount with approval
- [ ] Billing is linked to student ledger
- [ ] Student can view UNIFAST billing in portal

### US-UNI-003: Generate UNIFAST Reports
**As an** accounting officer  
**I want to** generate UNIFAST compliance reports  
**So that** government requirements are met

**Acceptance Criteria:**
- [ ] Report lists all UNIFAST beneficiaries with student details
- [ ] Report shows per-student subsidy amount claimed
- [ ] Report includes Certificate of Registration (COR) details
- [ ] Report includes Tertiary Education Subsidy (TES) details
- [ ] Report format complies with CHED submission requirements
- [ ] Report can be exported to Excel template provided by government
- [ ] Report includes summary totals for reimbursement claim
- [ ] Report generation completes within 60 seconds
- [ ] Officer can filter by term, program, campus
- [ ] Report includes audit trail of changes

### US-UNI-004: Track UNIFAST Reconciliation
**As an** accounting officer  
**I want to** track UNIFAST reimbursement claims  
**So that** government receivables are monitored

**Acceptance Criteria:**
- [ ] System tracks total subsidy claimed per term
- [ ] Officer can record claim submission date
- [ ] Officer can record reimbursement received date and amount
- [ ] System computes variance between claimed and received amounts
- [ ] Officer can add notes on reconciliation issues
- [ ] Dashboard shows pending claims and received amounts
- [ ] Officer can generate reconciliation report
- [ ] System alerts on overdue reimbursements (>90 days)
- [ ] Reconciliation is auditable with transaction logs

---

## 10. REPORTS MODULE

### US-REP-001: Generate Enrollment Summary Report
**As a** school administrator  
**I want to** generate enrollment summary report  
**So that** I can analyze enrollment statistics

**Acceptance Criteria:**
- [ ] Report shows total enrollment per program
- [ ] Report shows enrollment per year level
- [ ] Report shows enrollment per campus (if multi-campus)
- [ ] Report compares current vs previous term enrollment
- [ ] Report shows new students vs continuing students
- [ ] Report includes demographic breakdown (gender, age range)
- [ ] Report can be filtered by date range, program, campus
- [ ] Report includes charts and graphs
- [ ] Report is exportable to Excel, PDF
- [ ] Report generation completes within 30 seconds

### US-REP-002: Generate Report Cards
**As a** registrar  
**I want to** generate student report cards  
**So that** students receive official grade reports

**Acceptance Criteria:**
- [ ] Report card template is professionally designed
- [ ] Report card shows student information and photo
- [ ] Report card displays all subjects with grades per term
- [ ] Report card shows GPA for the term and cumulative GPA
- [ ] Report card includes grading scale reference
- [ ] Report card shows attendance summary
- [ ] Report card includes conduct grade
- [ ] Report card includes school seal and registrar signature
- [ ] Bulk generation available for all students in a section
- [ ] Report cards are printable on letter-size paper
- [ ] PDF generation option available

### US-REP-003: Generate Student Rankings
**As a** registrar  
**I want to** generate student ranking reports  
**So that** top performers are identified

**Acceptance Criteria:**
- [ ] Report ranks students by GPA (highest to lowest)
- [ ] Report can be filtered by program, year level, section
- [ ] Report can be generated per quarter or final term
- [ ] Report shows student rank, name, ID, GPA
- [ ] Report includes criteria used for ranking
- [ ] Report can exclude students with incomplete grades
- [ ] Top 10 or Top X students can be highlighted
- [ ] Report is exportable to Excel, PDF
- [ ] Report includes generation date and prepared by
- [ ] Report can be used for honors recognition

### US-REP-004: Generate Academic Failures Report
**As a** registrar  
**I want to** generate academic failures summary  
**So that** at-risk students can be identified for intervention

**Acceptance Criteria:**
- [ ] Report lists students with failing grades (below passing)
- [ ] Report shows number of failed subjects per student
- [ ] Report can be filtered by program, year level, quarter/term
- [ ] Report shows student name, ID, program, failed subjects
- [ ] Report includes student contact information for follow-up
- [ ] Report is exportable to Excel for counseling department
- [ ] Report includes summary statistics (total failures, percentage)
- [ ] Report can be scheduled for automatic generation after grading period
- [ ] Report highlights students at risk of probation

### US-REP-005: Generate Transcript of Records
**As a** registrar  
**I want to** generate official transcripts of records  
**So that** students can use them for applications and transfers

**Acceptance Criteria:**
- [ ] TOR includes complete academic history (all terms)
- [ ] TOR shows all subjects taken with grades
- [ ] TOR includes GPA per term and cumulative GPA
- [ ] TOR includes units earned and total units
- [ ] TOR formatted on official TOR paper with security features
- [ ] TOR includes student photo and basic information
- [ ] TOR includes school seal, registrar signature, date issued
- [ ] TOR includes "Issued For" purpose field
- [ ] TOR generation validates that student has no accountabilities
- [ ] TOR issuance is logged with date and purpose
- [ ] Student can request TOR via portal (with approval workflow)

### US-REP-006: Generate Financial Reports
**As an** accounting officer  
**I want to** generate comprehensive financial reports  
**So that** financial performance is monitored

**Acceptance Criteria:**
- [ ] Report shows total receivables (current + overdue)
- [ ] Report shows collections per period (daily, weekly, monthly)
- [ ] Report breaks down collections by payment method
- [ ] Report shows list of fully paid vs students with balance
- [ ] Report shows scholarship grants totals
- [ ] Report includes aging analysis (30, 60, 90+ days)
- [ ] Report can be filtered by program, campus, date range
- [ ] Report is exportable to Excel for further analysis
- [ ] Report includes visual charts (pie, bar graphs)
- [ ] Report shows comparison with previous period

### US-REP-007: Generate Cashier Collection Report
**As a** cashier supervisor  
**I want to** generate cashier collection reports  
**So that** daily collections are reconciled

**Acceptance Criteria:**
- [ ] Report lists all ORs issued per cashier per day
- [ ] Report shows total collections per cashier
- [ ] Report breaks down by payment method (cash, check, online)
- [ ] Report shows voided/cancelled transactions separately
- [ ] Report includes beginning and ending OR numbers
- [ ] Report totals must balance with cash remittance
- [ ] Report is printable for cashier sign-off
- [ ] Report can be generated for weekly/monthly periods
- [ ] Report includes supervisor approval section
- [ ] Report is exportable to Excel

### US-REP-008: Use Custom Report Builder
**As a** power user  
**I want to** create custom reports  
**So that** I can get specific data insights

**Acceptance Criteria:**
- [ ] User can select data source (students, enrollments, payments, etc.)
- [ ] User can select fields to include in report
- [ ] User can add filters (date range, program, status, etc.)
- [ ] User can add grouping (by program, by section, etc.)
- [ ] User can add sorting (ascending/descending)
- [ ] User can add calculated fields or formulas
- [ ] User can preview report before generating
- [ ] User can save report template for reuse
- [ ] Report can be exported to multiple formats (Excel, PDF, CSV, XML, HTML, RTF)
- [ ] Report builder has intuitive drag-and-drop interface
- [ ] User can schedule reports for automatic generation
- [ ] Generated reports can be emailed to recipients

---

## 11. USER MANAGEMENT

### US-USR-001: Create User Accounts
**As a** system administrator  
**I want to** create user accounts  
**So that** authorized users can access the system

**Acceptance Criteria:**
- [ ] Admin can create user with username, email, full name
- [ ] Admin can assign user type (admin, faculty, staff, student, parent)
- [ ] System generates temporary password
- [ ] Admin can assign user to specific campus/department
- [ ] System validates unique username and email
- [ ] User receives email with login credentials
- [ ] User is required to change password on first login
- [ ] Admin can set account expiration date (optional)
- [ ] Admin can activate/deactivate accounts
- [ ] Account creation is logged with date and created by

### US-USR-002: Assign Module Permissions
**As a** system administrator  
**I want to** assign module access permissions  
**So that** users only access authorized features

**Acceptance Criteria:**
- [ ] Admin can select user or role
- [ ] System displays list of all modules
- [ ] Admin can grant/revoke access per module
- [ ] Admin can set permission level (view only, edit, full access)
- [ ] Permission changes take effect immediately
- [ ] Admin can create custom roles with specific permissions
- [ ] Admin can clone permissions from existing user/role
- [ ] Permission matrix is viewable for audit
- [ ] System logs all permission changes
- [ ] Users see only authorized modules in navigation

### US-USR-003: Manage Data Access Control
**As a** system administrator  
**I want to** restrict data access per user  
**So that** users only see data relevant to their scope

**Acceptance Criteria:**
- [ ] Admin can limit user access by campus
- [ ] Admin can limit user access by department/college
- [ ] Admin can limit user access by year level or section
- [ ] Faculty can only access students in their assigned classes
- [ ] Department heads can access all students in their department
- [ ] Registrars can access all students campus-wide
- [ ] Parents can only access their own children's data
- [ ] Data restrictions apply to all modules and reports
- [ ] Admin can view effective access scope per user
- [ ] Access violations are logged and alerted

### US-USR-004: Reset User Passwords
**As a** system administrator  
**I want to** reset user passwords  
**So that** locked-out users can regain access

**Acceptance Criteria:**
- [ ] Admin can search for user by username or email
- [ ] Admin can trigger password reset
- [ ] System generates temporary password
- [ ] Reset email sent to user with temporary password
- [ ] Temporary password expires after first use or 24 hours
- [ ] User must change temporary password immediately
- [ ] Password reset action is logged
- [ ] Admin cannot view user passwords (encrypted)
- [ ] Self-service password reset option available for users

### US-USR-005: Manage User Sessions
**As a** system administrator  
**I want to** monitor and manage active sessions  
**So that** security is maintained

**Acceptance Criteria:**
- [ ] Admin can view all active user sessions
- [ ] Session list shows username, login time, IP address, device
- [ ] Admin can terminate suspicious or idle sessions
- [ ] Sessions timeout after 30 minutes of inactivity
- [ ] Users are warned before session timeout (2 minutes prior)
- [ ] Users can extend session before timeout
- [ ] Maximum of 2 concurrent sessions per user
- [ ] Login attempts are logged (successful and failed)
- [ ] Account locks after 5 failed login attempts
- [ ] Admin can unlock locked accounts

### US-USR-006: Audit User Activities
**As a** system administrator  
**I want to** view audit logs of user activities  
**So that** system usage is monitored for security

**Acceptance Criteria:**
- [ ] Audit log captures all critical user actions (login, data changes, deletions)
- [ ] Log includes timestamp, username, action type, affected record
- [ ] Admin can filter logs by date range, user, action type
- [ ] Admin can export logs to CSV or PDF
- [ ] Logs are tamper-proof (write-only, no deletion)
- [ ] Log retention period is configurable (minimum 1 year)
- [ ] System alerts on suspicious activities (multiple failed logins, mass deletions)
- [ ] Logs support compliance with data privacy regulations
- [ ] Search functionality available for log investigation
- [ ] Logs include before and after values for data changes

---

## Additional Cross-Cutting User Stories

### US-GEN-001: Mobile Responsive Access
**As a** user  
**I want to** access the system on mobile devices  
**So that** I can perform tasks on the go

**Acceptance Criteria:**
- [ ] All pages are responsive and adapt to mobile screen sizes
- [ ] Navigation is accessible via hamburger menu on mobile
- [ ] Forms are easy to fill on mobile devices
- [ ] Touch-friendly buttons and controls (min 44x44px)
- [ ] No horizontal scrolling required
- [ ] Images and charts scale appropriately
- [ ] Mobile performance is optimized (page load <5 seconds on 3G)
- [ ] Critical features accessible on mobile (view grades, pay bills, view schedule)

### US-GEN-002: Receive Notifications
**As a** user  
**I want to** receive system notifications  
**So that** I am informed of important events

**Acceptance Criteria:**
- [ ] User receives email notifications for critical events
- [ ] Notification types include: payment due, grade posted, enrollment open, schedule change
- [ ] User can configure notification preferences (email, SMS, in-app)
- [ ] In-app notifications appear as badge/alert
- [ ] Notifications link directly to relevant page
- [ ] Notification history is accessible
- [ ] User can mark notifications as read
- [ ] Urgent notifications are highlighted
- [ ] Notifications are sent in real-time or near real-time (<5 minutes)

### US-GEN-003: Export Data
**As a** user with appropriate permissions  
**I want to** export data to various formats  
**So that** I can use data in external tools

**Acceptance Criteria:**
- [ ] Export options include Excel, PDF, CSV, XML, HTML, RTF
- [ ] Exported data matches what is displayed on screen (including filters)
- [ ] Excel exports preserve formatting (headers, borders, colors)
- [ ] PDF exports are print-ready with proper page breaks
- [ ] Large exports (>10,000 records) are processed asynchronously
- [ ] User receives notification when large export is ready
- [ ] Export includes generation date and exported by
- [ ] File download starts automatically or link provided
- [ ] Exports respect user data access permissions

### US-GEN-004: Search Functionality
**As a** user  
**I want to** search for records quickly  
**So that** I can find information efficiently

**Acceptance Criteria:**
- [ ] Global search box available in header
- [ ] Search returns results from all accessible modules
- [ ] Search supports partial matches and auto-suggest
- [ ] Search results show record type and key fields
- [ ] Search results are clickable to view full record
- [ ] Advanced search available with multiple criteria
- [ ] Search results can be filtered and sorted
- [ ] Recent searches are saved for quick access
- [ ] Search performance: results displayed within 2 seconds
- [ ] Search respects user access permissions

### US-GEN-005: System Performance
**As a** user  
**I want** the system to be fast and responsive  
**So that** I can work efficiently

**Acceptance Criteria:**
- [ ] Page load time: <3 seconds for standard pages
- [ ] Dashboard loads within 5 seconds
- [ ] Large report generation: <30 seconds or asynchronous processing
- [ ] Database queries respond within 2 seconds
- [ ] System supports 500+ concurrent users without degradation
- [ ] Real-time updates (e.g., slot availability) update within 1 second
- [ ] System is accessible with 99.5% uptime
- [ ] Scheduled maintenance communicated 48 hours in advance
- [ ] Performance monitoring alerts on slowdowns

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 2025 | CMRP Automation | Initial user stories and acceptance criteria |

---

## Notes

1. **Priority Levels**: User stories can be prioritized as P1 (Critical), P2 (Important), P3 (Nice to Have) during sprint planning
2. **Story Points**: Each story should be estimated using story points (Fibonacci: 1, 2, 3, 5, 8, 13) during sprint planning
3. **Dependencies**: Some user stories have dependencies that must be completed first (e.g., Academic Setup before Enrollment)
4. **Testing**: Each acceptance criterion should have corresponding test cases
5. **Definition of Done**: All acceptance criteria must be met, code reviewed, tested, and documented before story is considered complete

