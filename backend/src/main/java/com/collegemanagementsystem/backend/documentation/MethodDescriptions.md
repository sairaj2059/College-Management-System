# Method Descriptions for College Management System

## Class: AdminService
- **register(StudentAuth student)**: 
  - Checks if the username exists, encodes the password, and saves the student to the repository.
  
- **verify(StudentAuth student)**: 
  - Authenticates the student and generates a JWT token if successful.

## Class: JWTService
- **generateToken(String username)**: 
  - Generates a JWT token for the given username.

- **extractUserName(String token)**: 
  - Extracts the username from the JWT token.

- **validateToken(String token, UserDetails userDetails)**: 
  - Validates the token against the user details.

## Class: StudentRepository
- **findByUsername(String username)**: 
  - Retrieves a `StudentAuth` object by username.

## Class: AdminController
- **greet(HttpServletRequest request)**: 
  - Handles GET requests to the `/dashboard` endpoint and returns a greeting message with the session ID.

- **register(StudentAuth student)**: 
  - Handles POST requests to the `/Register` endpoint and calls the `register` method from `AdminService`.

- **login(StudentAuth student)**: 
  - Handles POST requests to the `/login` endpoint and calls the `verify` method from `AdminService`.

## Class: StudentAuth (Model)
- **getUsername()**: 
  - Returns the student's username.

- **setPassword(String password)**: 
  - Sets the student's password.

## Class: StudentPrincipal
- **getAuthorities()**: 
  - Returns the authorities granted to the student (e.g., "USER").

- **getPassword()**: 
  - Returns the password of the student.

- **getUsername()**: 
  - Returns the username of the student.

## Class: StudentService
- **loadUserByUsername(String username)**: 
  - Loads user details by username, returning a `StudentPrincipal` if found, or throwing a `UsernameNotFoundException` if not found.

## Class: JwtFilter
- **doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)**: 
  - Processes incoming requests to check for a JWT token and sets the authentication in the security context if valid.

## Class: Securityconfig
- **securityFilterChain(HttpSecurity http)**: 
  - Configures the security filter chain, permitting access to specific endpoints and requiring authentication for others.

- **authenticationProvider()**: 
  - Creates and configures a `DaoAuthenticationProvider` for managing authentication.

- **authenticationManager(AuthenticationConfiguration config)**: 
  - Provides an `AuthenticationManager` bean for managing authentication.
