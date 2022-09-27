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



void Square(float xa, float ya, float xb, float yb, float xt, float yt)
{
    glBegin(GL_QUADS);
    //glColor3f(0.0f,0.0f,0.0f);
    glVertex3f(xa+xt,ya+yt,0.0f);
    glVertex3f(xb+xt,ya+yt,0.0f);
    glVertex3f(xb+xt,yb+yt,0.0f);
    glVertex3f(xa+xt,yb+yt,0.0f);
    glEnd();
    glFlush();
}



void Translation()
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
    
    float xa, ya, xb, yb, xt,yt;


    cout << "xa = ";
    cin >> xa;
    cout << "ya = ";
    cin >> ya;

    cout << "xb = ";
    cin >> xb;
    cout << "yb = ";
    cin >> yb;

    cout << "\n";

    cout << "xt = ";
    cin >> xt;
    cout << "yt = ";
    cin >> yt;

    
    glColor3f(1.0f,0.0f,0.0f);
    Square(xa, ya, xb, yb, 0,0);
    
    
    
    glColor3f(0.0f,0.0f,1.0f);
    Square(xa, ya, xb, yb, xt, yt);
}


int main(int argc,char* argv[])
{
    glutInit(&argc,argv);
    glutInitDisplayMode(GLUT_SINGLE|GLUT_RGB);
    glutInitWindowSize(640,480);
    glutCreateWindow("Fifth Exercise");
    glutDisplayFunc(Translation);
    myInit();
    glutMainLoop();
    return 1;
}