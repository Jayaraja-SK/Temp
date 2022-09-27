#include <GL/glut.h>
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;


void myInit() {
    glClearColor(1.0,1.0,1.0,0.0);
    glColor3f(0.0f,0.0f,0.0f);
    glPointSize(10);
    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();
    gluOrtho2D(-10.0,10.0,-10.0,10.0);
}


void plotPointString(int x, int y, int pos)
{
    glRasterPos2f(x,y+pos);

    std::string string;
    
    string="("+std::to_string(int(round(x)))+","+std::to_string(int(round(y)))+")";

    char *s=const_cast<char*>(string.c_str());

    for (char* c = s; *c != '\0'; c++)
            glutBitmapCharacter(GLUT_BITMAP_HELVETICA_10 , *c);
}



void plotPoint(int x, int y)
{
    glBegin(GL_POINTS);
    glVertex2f(x,y);
    glEnd();
}



void Square(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    glVertex3f(xa,ya,0.0f);
    glVertex3f(xb,ya,0.0f);
    glVertex3f(xb,yb,0.0f);
    glVertex3f(xa,yb,0.0f);
    glEnd();
    glFlush();
}


void SquareXY(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    glVertex3f(ya,xa,0.0f);
    glVertex3f(ya,xb,0.0f);
    glVertex3f(yb,xb,0.0f);
    glVertex3f(yb,xa,0.0f);
    glEnd();
    glFlush();
}


void SquareXAxis(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    glVertex3f(xa,-ya,0.0f);
    glVertex3f(xb,-ya,0.0f);
    glVertex3f(xb,-yb,0.0f);
    glVertex3f(xa,-yb,0.0f);
    glEnd();
    glFlush();
}


void SquareYAxis(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    glVertex3f(-xa,ya,0.0f);
    glVertex3f(-xb,ya,0.0f);
    glVertex3f(-xb,yb,0.0f);
    glVertex3f(-xa,yb,0.0f);
    glEnd();
    glFlush();
}


void SquareOrigin(float xa, float ya, float xb, float yb)
{
    glBegin(GL_QUADS);
    glVertex3f(-xa,-ya,0.0f);
    glVertex3f(-xb,-ya,0.0f);
    glVertex3f(-xb,-yb,0.0f);
    glVertex3f(-xa,-yb,0.0f);
    glEnd();
    glFlush();
}


void Reflection()
{
    glClear(GL_COLOR_BUFFER_BIT);
    
    glRasterPos2f(0.0f,0.0f);

    plotPointString(0,0,0);

    glLineWidth(2);
    glPointSize(7);
    glBegin(GL_LINES);
    
    glVertex3f(-320.0f,0.0f,0.0f);
    glVertex3f(320.0f,0.0f,0.0f);

    glEnd();

    

    glLineWidth(2);

    glBegin(GL_LINES);

    glVertex3f(0.0f,-240.0f,0.0f);
    glVertex3f(0.0f,240.0f,0.0f);

    glEnd();



    glLineWidth(2);

    glBegin(GL_LINES);

    glVertex3f(-10.0f,-10.0f,0.0f);
    glVertex3f(10.0f,10.0f,0.0f);

    glEnd();
    
    float xa, ya, xb, yb, shx, shy, xref, yref;


    cout << "xa = "; // 0,2 2,4
    cin >> xa;
    cout << "ya = ";
    cin >> ya;

    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;

    cout << "\n";

    int choice;

    cout << "1. X-Axis\n";
    cout << "2. Y-Axis\n";
    cout << "3. Origin\n";
    cout << "4. Y=X Line\n\n";

    cout << "CHOICE = ";
    cin >> choice;


    glColor3f(1.0f,0.0f,0.0f);
    Square(xa, ya, xb, yb);


    if(choice == 1)
    {
        glColor3f(0.0f,1.0f,0.0f);
        SquareXAxis(xa, ya, xb, yb);
    }
    else if(choice == 2)
    {
        glColor3f(0.0f,1.0f,1.0f);
        SquareYAxis(xa, ya, xb, yb);
    }
    else if(choice == 3)
    {
        glColor3f(0.0f,1.0f,0.0f);
        SquareOrigin(xa, ya, xb, yb);
    }
    else if(choice == 4)
    {
        glColor3f(0.0f,1.0f,0.0f);
        SquareXY(xa, ya, xb, yb);
    }
}


int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Reflection);
    myInit();
    glutMainLoop();
    return 1;
}