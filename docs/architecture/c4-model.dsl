workspace "Course Search" "A system to search for courses available at the University of York" {

    model {
        prospectiveStudent = person "Prospective Student" "A prospective student, searching for one or more courses"

        courseSearch = softwareSystem "Course Search" "Allows anyone to search for details of courses available at the University of York" {
            webApplication = container "Web Application" "Provides functionality for users to search for courses in their web browser" "Next.js on AWS Lambda" "Web Browser"
            apiApplication = container "API" "Provides course search functionality via a JSON/HTTPS API" "AWS API Gateway and AWS Lambda"
        }

        # external software systems
        searchProvider = softwareSystem "Funnelback Search Engine" "The system that powers searches on the University of York website" "Existing System"
        yorkWeb = softwareSystem "University of York website" "www.york.ac.uk, which hosts course pages and information" "Existing System" {
            coursePages = container "Course Pages" "Course pages published on the University of York website"
            externalCourses = container "External Courses Feed" "A feed of information for courses at partner institutions e.g. HYMS"
        }
        hyms = softwareSystem "HYMS website" "www.hyms.ac.uk, which hosts course pages and information" "Existing System"

        # system context relationships
        prospectiveStudent -> courseSearch "Searches for courses using"
        courseSearch -> searchProvider "Queries"
        courseSearch -> yorkWeb "Links to course pages on"
        courseSearch -> hyms "Links to course pages on"
        searchProvider -> yorkWeb "Indexes course information on"

        # container relationships
        prospectiveStudent -> webApplication "Searches for courses using" "HTTPS"
        webApplication -> apiApplication "Makes API calls to" "JSON/HTTPS"
        webApplication -> yorkWeb "Links to course pages on" "HTTPS"
        webApplication -> hyms "Links to course pages on" "HTTPS"
        apiApplication -> searchProvider "Makes API calls to" "JSON/HTTPS"
        
        searchProvider -> coursePages "Indexes course information on" "HTTPS"
        searchProvider -> externalCourses "Indexes course information in" "HTTPS"
    }

    views {
        systemContext courseSearch "SystemContext" {
            include *
            autoLayout
        }

        container courseSearch "CourseSearchContainer" {
            include *
            autoLayout
        }
        
        container yorkWeb "YorkWebContainer" {
            include *
            autoLayout lr
        }

        styles {
            element "Software System" {
                background #1168bd
                color #ffffff
            }

            element "Existing System" {
                background #999999
                color #ffffff
            }

            element "Person" {
                shape roundedBox
                background #08427b
                color #ffffff
            }

            element "Container" {
                background #438dd5
                color #ffffff
            }

            element "Web Browser" {
                shape WebBrowser
            }
        }
    }
}
