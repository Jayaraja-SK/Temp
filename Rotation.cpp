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


float RotateX(float x, float y, float xr, float yr, float theta)
{
    if(theta >= 2*3.14159)
    {
        theta = theta - (2*3.14159);
        cout << cos(1.04);
        cout << "\n";
    }

    float x_1;

    x_1 = xr + (x-xr)*cos(theta) - (y-yr)*sin(theta);

    return x_1;
}


float RotateY(float x, float y, float xr, float yr, float theta)
{
    if(theta >= 2*3.14159)
    {
        theta = theta - (2*3.14159);
    }

    float y_1;

    y_1 = yr + (x-xr)*sin(theta) + (y-yr)*cos(theta);

    return y_1;
}



void Square(float xa, float ya, float xb, float yb, float xr, float yr, float theta)
{
    glBegin(GL_QUADS);
    glVertex3f(RotateX(xa, ya, xr, yr, theta),RotateY(xa, ya, xr, yr, theta),0.0f);
    glVertex3f(RotateX(xb, ya, xr, yr, theta),RotateY(xb, ya, xr, yr, theta),0.0f);
    glVertex3f(RotateX(xb, yb, xr, yr, theta),RotateY(xb, yb, xr, yr, theta),0.0f);
    glVertex3f(RotateX(xa, yb, xr, yr, theta),RotateY(xa, yb, xr, yr, theta),0.0f);
    glEnd();
    glFlush();
}



void Rotation()
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
    
    float xa, ya, xb, yb, xr, yr, theta;


    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;

    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;

    cout << "\n";

    cout << "xr = ";
    cin >> xr;
    cout << "yr = ";
    cin >> yr;

    cout << "\n";

    cout << "theta = ";
    cin >> theta;


    theta = (theta*3.14159)/180;
    
    glColor3f(1.0f,0.0f,0.0f);
    Square(xa, ya, xb, yb, 0, 0, 0);
    
    
    glColor3f(0.0f,0.0f,1.0f);
    Square(xa, ya, xb, yb, xr, yr, theta);
}


int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Rotation);
    myInit();
    glutMainLoop();
    return 1;
}